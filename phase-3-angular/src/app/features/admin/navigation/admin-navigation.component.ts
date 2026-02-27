import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavItem } from '../../../core/models/nav-item.model';
import { NavService } from '../../../core/services/nav.service';

@Component({
  selector: 'app-admin-navigation',
  templateUrl: './admin-navigation.component.html',
  standalone: false,
  styleUrls: ['./admin-navigation.component.scss']
})
export class AdminNavigationComponent implements OnInit {
  items: NavItem[] = [];
  loading = true;
  showForm = false;
  editingId: number | null = null;
  form!: FormGroup;
  isSaving = false;
  deleteConfirmId: number | null = null;

  constructor(private service: NavService, private fb: FormBuilder) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.service.getAll(false).subscribe(data => { this.items = data; this.loading = false; });
  }

  openCreate(): void {
    this.editingId = null;
    this.form = this.fb.group({ label: ['', Validators.required], url: ['/', Validators.required], isActive: [true], displayOrder: [0], openInNewTab: [false] });
    this.showForm = true;
  }

  openEdit(item: NavItem): void {
    this.editingId = item.id;
    this.form = this.fb.group({ label: [item.label, Validators.required], url: [item.url, Validators.required], isActive: [item.isActive], displayOrder: [item.displayOrder], openInNewTab: [item.openInNewTab] });
    this.showForm = true;
  }

  onSubmit(): void {
    if (this.form.invalid || this.isSaving) return;
    this.isSaving = true;
    const obs = this.editingId ? this.service.update(this.editingId, this.form.value) : this.service.create(this.form.value);
    obs.subscribe(() => { this.isSaving = false; this.showForm = false; this.load(); });
  }

  confirmDelete(id: number): void { this.deleteConfirmId = id; }
  doDelete(): void {
    if (!this.deleteConfirmId) return;
    this.service.delete(this.deleteConfirmId).subscribe(() => { this.deleteConfirmId = null; this.load(); });
  }

  get f() { return this.form.controls; }
}
