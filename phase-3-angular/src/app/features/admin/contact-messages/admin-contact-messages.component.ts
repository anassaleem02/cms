import { Component, OnInit } from '@angular/core';
import { ContactMessage } from '../../../core/models/contact.model';
import { ContactService } from '../../../core/services/contact.service';

@Component({
  selector: 'app-admin-contact-messages',
  templateUrl: './admin-contact-messages.component.html',
  standalone: false,
  styleUrls: ['./admin-contact-messages.component.scss']
})
export class AdminContactMessagesComponent implements OnInit {
  messages: ContactMessage[] = [];
  loading = true;
  selectedMessage: ContactMessage | null = null;
  deleteConfirmId: number | null = null;

  constructor(private service: ContactService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.service.getAll().subscribe(data => { this.messages = data; this.loading = false; });
  }

  viewMessage(msg: ContactMessage): void {
    this.selectedMessage = msg;
    if (!msg.isRead) {
      this.service.markAsRead(msg.id).subscribe(() => {
        const idx = this.messages.findIndex(m => m.id === msg.id);
        if (idx !== -1) this.messages[idx] = { ...this.messages[idx], isRead: true };
      });
    }
  }

  confirmDelete(id: number): void { this.deleteConfirmId = id; }

  doDelete(): void {
    if (!this.deleteConfirmId) return;
    this.service.delete(this.deleteConfirmId).subscribe(() => {
      this.deleteConfirmId = null;
      if (this.selectedMessage?.id === this.deleteConfirmId) this.selectedMessage = null;
      this.load();
    });
  }

  get unreadCount(): number { return this.messages.filter(m => !m.isRead).length; }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
}
