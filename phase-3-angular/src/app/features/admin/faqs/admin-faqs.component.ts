import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Faq } from '../../../core/models/faq.model';
import { FaqService } from '../../../core/services/faq.service';

@Component({
  selector: 'app-admin-faqs',
  templateUrl: './admin-faqs.component.html',
  standalone: false,
  styleUrls: ['./admin-faqs.component.scss']
})
export class AdminFaqsComponent implements OnInit {
  items: Faq[] = [];
  loading = true;
  showForm = false;
  editingId: number | null = null;
  form!: FormGroup;
  isSaving = false;
  deleteConfirmId: number | null = null;

  constructor(private service: FaqService, private fb: FormBuilder) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.service.getAll(false).subscribe(data => { this.items = data; this.loading = false; });
  }

  openCreate(): void {
    this.editingId = null;
    this.form = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
      isActive: [true],
      displayOrder: [0]
    });
    this.showForm = true;
  }

  openEdit(item: Faq): void {
    this.editingId = item.id;
    this.form = this.fb.group({
      question: [item.question, Validators.required],
      answer: [item.answer, Validators.required],
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

  get f() { return this.form.controls; }
}
