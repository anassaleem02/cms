import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Testimonial } from '../../../core/models/testimonial.model';
import { TestimonialService } from '../../../core/services/testimonial.service';

@Component({
  selector: 'app-admin-testimonials',
  templateUrl: './admin-testimonials.component.html',
  standalone: false,
  styleUrls: ['./admin-testimonials.component.scss']
})
export class AdminTestimonialsComponent implements OnInit {
  items: Testimonial[] = [];
  loading = true;
  showForm = false;
  editingId: number | null = null;
  form!: FormGroup;
  isSaving = false;
  deleteConfirmId: number | null = null;

  constructor(private service: TestimonialService, private fb: FormBuilder) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.service.getAll(false).subscribe(data => { this.items = data; this.loading = false; });
  }

  openCreate(): void {
    this.editingId = null;
    this.form = this.fb.group({
      customerName: ['', Validators.required],
      customerTitle: ['', Validators.required],
      customerImageUrl: [''],
      review: ['', [Validators.required, Validators.minLength(10)]],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      isActive: [true],
      displayOrder: [0]
    });
    this.showForm = true;
  }

  openEdit(item: Testimonial): void {
    this.editingId = item.id;
    this.form = this.fb.group({
      customerName: [item.customerName, Validators.required],
      customerTitle: [item.customerTitle, Validators.required],
      customerImageUrl: [item.customerImageUrl],
      review: [item.review, [Validators.required, Validators.minLength(10)]],
      rating: [item.rating, [Validators.required, Validators.min(1), Validators.max(5)]],
      isActive: [item.isActive],
      displayOrder: [item.displayOrder]
    });
    this.showForm = true;
  }

  onSubmit(): void {
    if (this.form.invalid || this.isSaving) return;
    this.isSaving = true;
    const obs = this.editingId
      ? this.service.update(this.editingId, this.form.value)
      : this.service.create(this.form.value);
    obs.subscribe(() => { this.isSaving = false; this.showForm = false; this.load(); });
  }

  confirmDelete(id: number): void { this.deleteConfirmId = id; }

  doDelete(): void {
    if (!this.deleteConfirmId) return;
    this.service.delete(this.deleteConfirmId).subscribe(() => { this.deleteConfirmId = null; this.load(); });
  }

  getStars(n: number): number[] { return Array(n).fill(0); }
  get f() { return this.form.controls; }
}
