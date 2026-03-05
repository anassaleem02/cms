import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContactService } from '../../../core/services/contact.service';
import { SeoService } from '../../../core/services/seo.service';
import { FaqService } from '../../../core/services/faq.service';
import { SettingsService } from '../../../core/services/settings.service';
import { Faq } from '../../../core/models/faq.model';
import { SiteSettings } from '../../../core/models/site-settings.model';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact.component.html',
  standalone: false,
  styleUrls: ['./contact.component.scss']
})
export class ContactPageComponent implements OnInit {
  form!: FormGroup;
  isSubmitting = false;
  isSuccess = false;
  errorMessage = '';

  openFaqIndex: number | null = null;
  faqs: Faq[] = [];
  settings: SiteSettings | null = null;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private seoService: SeoService,
    private faqService: FaqService,
    private settingsService: SettingsService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.faqService.getAll().subscribe(faqs => this.faqs = faqs);
    this.settingsService.get().subscribe(s => this.settings = s);
    this.seoService.setPage({
      title: 'Contact Us',
      description: "Get in touch with FM's Power for solar installation quotes, product inquiries, and after-sales support in Karachi.",
      url: '/contact'
    });
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]{10,15}$/)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid || this.isSubmitting) return;
    this.isSubmitting = true;
    this.errorMessage = '';
    this.contactService.submit(this.form.value).subscribe({
      next: () => {
        this.isSuccess = true;
        this.isSubmitting = false;
        this.form.reset();
      },
      error: () => {
        this.errorMessage = 'Something went wrong. Please try again.';
        this.isSubmitting = false;
      }
    });
  }

  toggleFaq(index: number): void {
    this.openFaqIndex = this.openFaqIndex === index ? null : index;
  }

  get whatsAppUrl(): string {
    const num = this.settings?.whatsApp?.replace(/\D/g, '') || '923222550299';
    return `https://wa.me/${num}`;
  }

  get phoneUrl(): string {
    return `tel:${this.settings?.phone || '03222550299'}`;
  }

  get emailUrl(): string {
    return `mailto:${this.settings?.email || 'thefmstrading@gmail.com'}`;
  }

  get mapUrl(): SafeResourceUrl {
    const url = this.settings?.mapEmbedUrl ||
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.855!2d67.0151!3d24.8569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92a51568c11f2!2sSaddar%2C%20Karachi!5e0!3m2!1sen!2spk!4v1234567890!5m2!1sen!2spk';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  get f() { return this.form.controls; }
}
