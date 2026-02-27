import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastComponent } from './components/toast/toast.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [ToastComponent, LoadingBarComponent, ConfirmDialogComponent, BreadcrumbComponent],
  imports: [CommonModule, RouterModule],
  exports: [ToastComponent, LoadingBarComponent, ConfirmDialogComponent, BreadcrumbComponent]
})
export class SharedModule {}
