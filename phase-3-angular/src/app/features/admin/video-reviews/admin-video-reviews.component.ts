import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VideoReview } from '../../../core/models/video-review.model';
import { VideoReviewService } from '../../../core/services/video-review.service';

@Component({
  selector: 'app-admin-video-reviews',
  templateUrl: './admin-video-reviews.component.html',
  standalone: false,
  styleUrls: ['./admin-video-reviews.component.scss']
})
export class AdminVideoReviewsComponent implements OnInit {
  items: VideoReview[] = [];
  loading = true;
  showForm = false;
  editingId: number | null = null;
  form!: FormGroup;
  isSaving = false;
  deleteConfirmId: number | null = null;

  constructor(private service: VideoReviewService, private fb: FormBuilder) {}

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
      youtubeUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      isActive: [true],
      displayOrder: [0]
    });
    this.showForm = true;
  }

  openEdit(item: VideoReview): void {
    this.editingId = item.id;
    this.form = this.fb.group({
      title: [item.title, Validators.required],
      description: [item.description, Validators.required],
      youtubeUrl: [item.youtubeUrl, [Validators.required, Validators.pattern('https?://.+')]],
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
