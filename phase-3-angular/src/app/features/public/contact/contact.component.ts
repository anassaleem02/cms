import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../../core/services/contact.service';
import { SeoService } from '../../../core/services/seo.service';

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

  faqs = [
    { question: 'What areas do you serve?', answer: 'We serve all areas of Karachi and surrounding regions including DHA, Clifton, Gulshan-e-Iqbal, SITE, Saddar, North Nazimabad, and more.' },
    { question: 'How long does installation take?', answer: 'A standard residential installation typically takes 1-2 days. Commercial installations may take longer depending on system size.' },
    { question: 'What warranty do you offer?', answer: 'All our products come with a 5-year manufacturer warranty. This covers inverters, lithium batteries, and solar panels. We also provide after-sales support throughout the warranty period.' },
    { question: 'Do you offer financing?', answer: 'Yes, we offer flexible payment plans to make solar energy accessible. Contact us for details on our installment options and financing partners.' },
    { question: 'How do I maintain my solar system?', answer: 'Our team provides regular maintenance services. Annual checkups are recommended to ensure optimal performance. We also offer remote monitoring so issues can be identified and resolved quickly.' }
  ];

  constructor(private fb: FormBuilder, private contactService: ContactService, private seoService: SeoService) {}

  ngOnInit(): void {
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

  get f() { return this.form.controls; }
}
