import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../../core/services/media.service';
import { MediaFile } from '../../../core/models/media.model';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-admin-media',
  standalone: false,
  templateUrl: './admin-media.component.html',
  styleUrls: ['./admin-media.component.scss']
})
export class AdminMediaComponent implements OnInit {
  files: MediaFile[] = [];
  filteredFiles: MediaFile[] = [];
  loading = true;
  uploading = false;
  searchQuery = '';
  filterType = '';
  deleteDialogVisible = false;
  fileToDelete: MediaFile | null = null;
  dragOver = false;

  fileTypes = [
    { label: 'All', value: '' },
    { label: 'Images', value: 'image' },
    { label: 'Videos', value: 'video' },
    { label: 'Documents', value: 'application' }
  ];

  constructor(
    private mediaService: MediaService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void { this.loadFiles(); }

  loadFiles(): void {
    this.loading = true;
    this.mediaService.getAll().subscribe({
      next: (files) => { this.files = files; this.applyFilters(); this.loading = false; },
      error: () => { this.notificationService.error('Failed to load media files.'); this.loading = false; }
    });
  }

  applyFilters(): void {
    this.filteredFiles = this.files.filter(f => {
      const matchSearch = !this.searchQuery || f.originalFileName.toLowerCase().includes(this.searchQuery.toLowerCase()) || (f.tags || '').toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchType = !this.filterType || f.contentType.startsWith(this.filterType);
      return matchSearch && matchType;
    });
  }

  onSearchChange(): void { this.applyFilters(); }
  onFilterChange(): void { this.applyFilters(); }

  onDragOver(e: DragEvent): void { e.preventDefault(); this.dragOver = true; }
  onDragLeave(): void { this.dragOver = false; }
  onDrop(e: DragEvent): void {
    e.preventDefault(); this.dragOver = false;
    const files = Array.from(e.dataTransfer?.files || []);
    if (files.length) this.uploadFiles(files);
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) this.uploadFiles(Array.from(input.files));
  }

  uploadFiles(files: File[]): void {
    this.uploading = true;
    let completed = 0;
    files.forEach(file => {
      this.mediaService.upload(file).subscribe({
        next: (uploaded) => {
          this.files.unshift(uploaded);
          this.applyFilters();
          completed++;
          if (completed === files.length) { this.uploading = false; this.notificationService.success(`${files.length} file(s) uploaded successfully.`); }
        },
        error: () => { completed++; if (completed === files.length) this.uploading = false; this.notificationService.error(`Failed to upload ${file.name}.`); }
      });
    });
  }

  copyUrl(url: string): void {
    navigator.clipboard.writeText(`http://localhost:5000${url}`).then(() => this.notificationService.success('URL copied to clipboard!'));
  }

  confirmDelete(file: MediaFile): void { this.fileToDelete = file; this.deleteDialogVisible = true; }

  onDeleteConfirmed(): void {
    if (!this.fileToDelete) return;
    const id = this.fileToDelete.id;
    this.mediaService.delete(id).subscribe({
      next: () => {
        this.files = this.files.filter(f => f.id !== id);
        this.applyFilters();
        this.notificationService.success('File deleted.');
        this.fileToDelete = null;
      },
      error: () => this.notificationService.error('Failed to delete file.')
    });
  }

  isImage(file: MediaFile): boolean { return file.contentType.startsWith('image'); }
  formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }
}
