import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './components/toast/toast.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';

@NgModule({
  declarations: [ToastComponent, LoadingBarComponent],
  imports: [CommonModule],
  exports: [ToastComponent, LoadingBarComponent]
})
export class SharedModule {}
