import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PublicLayoutComponent } from '../../layout/public-layout/public-layout.component';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';

import { HomeComponent } from './home/home.component';
import { HeroComponent } from './home/components/hero/hero.component';
import { ProductsShowcaseComponent } from './home/components/products-showcase/products-showcase.component';
import { FeaturesGridComponent } from './home/components/features-grid/features-grid.component';
import { TestimonialsComponent } from './home/components/testimonials/testimonials.component';
import { ServicesSectionComponent } from './home/components/services-section/services-section.component';
import { CtaComponent } from './home/components/cta/cta.component';
import { ContactFormComponent } from './home/components/contact-form/contact-form.component';

import { ProductsPageComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AboutComponent } from './about/about.component';
import { ContactPageComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'products', component: ProductsPageComponent },
      { path: 'products/:slug', component: ProductDetailComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactPageComponent }
    ]
  }
];

@NgModule({
  declarations: [
    PublicLayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HeroComponent,
    ProductsShowcaseComponent,
    FeaturesGridComponent,
    TestimonialsComponent,
    ServicesSectionComponent,
    CtaComponent,
    ContactFormComponent,
    ProductsPageComponent,
    ProductDetailComponent,
    AboutComponent,
    ContactPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PublicModule {}
