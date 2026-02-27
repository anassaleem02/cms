import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '../../../core/services/settings.service';
import { SiteSettings } from '../../../core/models/site-settings.model';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  standalone: false,
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent implements OnInit {
  form!: FormGroup;
  loading = true;
  isSaving = false;
  saveSuccess = false;

  constructor(private service: SettingsService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.service.get().subscribe(settings => {
      this.buildForm(settings);
      this.loading = false;
    });
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
      metaDescription: [s.metaDescription]
    });
  }

  onSubmit(): void {
    if (this.form.invalid || this.isSaving) return;
    this.isSaving = true;
    this.service.update(this.form.value).subscribe(() => {
      this.isSaving = false;
      this.saveSuccess = true;
      setTimeout(() => this.saveSuccess = false, 3000);
    });
  }
}
