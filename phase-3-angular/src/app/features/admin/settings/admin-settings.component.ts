import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { SettingsService } from '../../../core/services/settings.service';
import { MediaService } from '../../../core/services/media.service';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { SiteSettings } from '../../../core/models/site-settings.model';

function passwordMatchValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const np = group.get('newPassword')?.value;
    const cp = group.get('confirmPassword')?.value;
    return np && cp && np !== cp ? { mismatch: true } : null;
  };
}

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  standalone: false,
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent implements OnInit {
  form!: FormGroup;
  pwForm!: FormGroup;

  loading = true;
  isSaving = false;
  saveSuccess = false;

  uploadingLogo = false;
  uploadingFavicon = false;

  isChangingPw = false;
  pwError = '';
  pwSuccess = false;

  showCurrent = false;
  showNew = false;
  showConfirm = false;

  constructor(
    private service: SettingsService,
    private mediaService: MediaService,
    private authService: AuthService,
    private notification: NotificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.service.get().subscribe({
      next: settings => { this.buildForm(settings); this.loading = false; },
      error: () => { this.buildForm({} as SiteSettings); this.loading = false; }
    });

    this.pwForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator() });
  }

  buildForm(s: SiteSettings): void {
    this.form = this.fb.group({
      siteName: [s.siteName, Validators.required],
      tagLine: [s.tagLine],
      logoUrl: [s.logoUrl],
      faviconUrl: [s.faviconUrl],
      phone: [s.phone, Validators.required],
      email: [s.email, [Validators.required, Validators.email]],
      whatsApp: [s.whatsApp, Validators.required],
      address: [s.address, Validators.required],
      businessHours: [s.businessHours],
      facebookUrl: [s.facebookUrl],
      instagramUrl: [s.instagramUrl],
      youtubeUrl: [s.youtubeUrl],
      googleAnalyticsId: [s.googleAnalyticsId],
      metaTitle: [s.metaTitle],
      metaDescription: [s.metaDescription],
      mapEmbedUrl: [s.mapEmbedUrl]
    });
  }

  onSubmit(): void {
    if (this.isSaving) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notification.error('Please fill in all required fields correctly.');
      return;
    }
    this.isSaving = true;
    this.service.update(this.form.value).subscribe({
      next: (saved) => {
        this.isSaving = false;
        this.saveSuccess = true;
        this.notification.success('Settings saved successfully!');
        if (saved?.faviconUrl) {
          const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
          if (link) link.href = saved.faviconUrl;
        }
        setTimeout(() => this.saveSuccess = false, 3000);
      },
      error: () => { this.isSaving = false; this.notification.error('Failed to save settings.'); }
    });
  }

  onLogoFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.uploadingLogo = true;
    this.mediaService.upload(file, 'logo').subscribe({
      next: (media) => {
        this.form.patchValue({ logoUrl: media.url });
        this.uploadingLogo = false;
      },
      error: () => { this.uploadingLogo = false; }
    });
  }

  onFaviconFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.uploadingFavicon = true;
    this.mediaService.upload(file, 'favicon').subscribe({
      next: (media) => {
        this.form.patchValue({ faviconUrl: media.url });
        this.uploadingFavicon = false;
      },
      error: () => { this.uploadingFavicon = false; }
    });
  }

  onChangePassword(): void {
    if (this.pwForm.invalid || this.isChangingPw) return;
    this.isChangingPw = true;
    this.pwError = '';
    this.pwSuccess = false;
    const { currentPassword, newPassword, confirmPassword } = this.pwForm.value;
    this.authService.changePassword({ currentPassword, newPassword, confirmPassword }).subscribe({
      next: () => {
        this.isChangingPw = false;
        this.pwSuccess = true;
        this.pwForm.reset();
        setTimeout(() => this.pwSuccess = false, 4000);
      },
      error: (err) => {
        this.isChangingPw = false;
        this.pwError = err?.error?.message || 'Current password is incorrect. Please try again.';
      }
    });
  }
}
