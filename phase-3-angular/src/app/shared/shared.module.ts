import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastComponent } from './components/toast/toast.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { LazyImageDirective } from './directives/lazy-image.directive';
import { ScrollRevealDirective } from './directives/scroll-reveal.directive';

@NgModule({
  declarations: [ToastComponent, LoadingBarComponent, ConfirmDialogComponent, BreadcrumbComponent, LazyImageDirective, ScrollRevealDirective],
  imports: [CommonModule, RouterModule],
  exports: [ToastComponent, LoadingBarComponent, ConfirmDialogComponent, BreadcrumbComponent, LazyImageDirective, ScrollRevealDirective]
})
export class SharedModule {}
