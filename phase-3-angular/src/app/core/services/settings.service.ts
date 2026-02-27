import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { SiteSettings, UpdateSiteSettingsDto } from '../models/site-settings.model';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private settings: SiteSettings = {
    id: 1,
    siteName: "FM's Power",
    tagLine: 'Premium Solar Energy Solutions',
    logoUrl: '/images/logo/fms-power-logo.png',
    faviconUrl: '/images/logo/favicon.ico',
    phone: '0322-2550299',
    email: 'thefmstrading@gmail.com',
    whatsApp: '+923222550299',
    address: 'Shop G31-G50, Ground Floor, Al-Najeebi Electronic Bazar, Agha Khan Road 3, Near Star City Mall, Saddar, Karachi',
    businessHours: 'Mon-Sat: 9:00 AM - 8:00 PM, Sun: Closed',
    facebookUrl: 'https://facebook.com/fmspower',
    instagramUrl: 'https://instagram.com/fmspower',
    youtubeUrl: 'https://youtube.com/fmspower',
    metaTitle: "FM's Power - Premium Solar Energy Solutions in Karachi",
    metaDescription: 'Leading provider of solar inverters, lithium batteries and solar panels in Karachi. 5-year warranty. Call 0322-2550299.'
  };

  get(): Observable<SiteSettings> {
    return of({ ...this.settings }).pipe(delay(200));
  }

  update(dto: UpdateSiteSettingsDto): Observable<SiteSettings> {
    this.settings = { ...this.settings, ...dto };
    return of({ ...this.settings }).pipe(delay(300));
  }
}
