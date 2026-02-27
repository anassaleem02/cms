import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feature } from '../../../core/models/feature.model';
import { FeatureService } from '../../../core/services/feature.service';

@Component({
  selector: 'app-admin-features',
  templateUrl: './admin-features.component.html',
  standalone: false,
  styleUrls: ['./admin-features.component.scss']
})
export class AdminFeaturesComponent implements OnInit {
  items: Feature[] = [];
  loading = true;
  showForm = false;
  editingId: number | null = null;
  form!: FormGroup;
  isSaving = false;
  deleteConfirmId: number | null = null;

  iconOptions = ['zap', 'smartphone', 'shield', 'trending-up', 'wifi', 'layers', 'tool', 'settings', 'award', 'activity'];

  constructor(private service: FeatureService, private fb: FormBuilder) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.service.getAll(false).subscribe(data => { this.items = data; this.loading = false; });
  }

  openCreate(): void {
    this.editingId = null;
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      icon: ['zap', Validators.required],
      isActive: [true],
      displayOrder: [0]
    });
    this.showForm = true;
  }

  openEdit(item: Feature): void {
    this.editingId = item.id;
    this.form = this.fb.group({
      title: [item.title, Validators.required],
      description: [item.description, Validators.required],
      icon: [item.icon, Validators.required],
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
