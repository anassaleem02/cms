import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from '../../shared/shared.module';

import { AuthGuard } from '../../core/guards/auth.guard';
import { AdminLayoutComponent } from '../../layout/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminProductsComponent } from './products/admin-products.component';
import { AdminHeroComponent } from './hero/admin-hero.component';
import { AdminFeaturesComponent } from './features/admin-features.component';
import { AdminTestimonialsComponent } from './testimonials/admin-testimonials.component';
import { AdminServicesComponent } from './services/admin-services.component';
import { AdminContactMessagesComponent } from './contact-messages/admin-contact-messages.component';
import { AdminSettingsComponent } from './settings/admin-settings.component';
import { AdminNavigationComponent } from './navigation/admin-navigation.component';
import { AdminMediaComponent } from './media/admin-media.component';
import { AdminVideoReviewsComponent } from './video-reviews/admin-video-reviews.component';
import { AdminFaqsComponent } from './faqs/admin-faqs.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'hero', component: AdminHeroComponent },
      { path: 'features', component: AdminFeaturesComponent },
      { path: 'testimonials', component: AdminTestimonialsComponent },
      { path: 'services', component: AdminServicesComponent },
      { path: 'messages', component: AdminContactMessagesComponent },
      { path: 'contact-messages', component: AdminContactMessagesComponent },
      { path: 'settings', component: AdminSettingsComponent },
      { path: 'navigation', component: AdminNavigationComponent },
      { path: 'media', component: AdminMediaComponent },
      { path: 'video-reviews', component: AdminVideoReviewsComponent },
      { path: 'faqs', component: AdminFaqsComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginComponent,
    DashboardComponent,
    AdminProductsComponent,
    AdminHeroComponent,
    AdminFeaturesComponent,
    AdminTestimonialsComponent,
    AdminServicesComponent,
    AdminContactMessagesComponent,
    AdminSettingsComponent,
    AdminNavigationComponent,
    AdminMediaComponent,
    AdminVideoReviewsComponent,
    AdminFaqsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    QuillModule.forRoot(),
    SharedModule
  ]
})
export class AdminModule {}
