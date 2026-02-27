import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Product, ProductCategory, CreateProductDto, UpdateProductDto } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private mockProducts: Product[] = [
    {
      id: 1, name: 'S.O Series 1.6 KW Inverter', slug: 'so-series-1-6kw-inverter',
      shortDescription: 'Pure Sine Wave Hybrid Solar Inverter with 12V battery support and MPPT technology.',
      description: '<p>The S.O Series 1.6 KW Inverter is designed for small to medium homes. With Pure Sine Wave output, it safely powers all types of appliances including sensitive electronics.</p><p>Built with advanced MPPT technology, it maximizes solar energy harvest throughout the day. The compact design makes it easy to install in any location.</p>',
      category: ProductCategory.Inverter, categoryName: 'Inverter',
      isFeatured: true, isActive: true, displayOrder: 0,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      images: [{ id: 1, imageUrl: '/images/products/inverter-1.6kw.png', altText: 'S.O Series 1.6 KW Inverter', isPrimary: true, displayOrder: 0 }],
      specifications: [
        { id: 1, key: 'Power Output', value: '1600W', displayOrder: 0 },
        { id: 2, key: 'Battery Voltage', value: '12V', displayOrder: 1 },
        { id: 3, key: 'Wave Form', value: 'Pure Sine Wave', displayOrder: 2 },
        { id: 4, key: 'Warranty', value: '5 Years', displayOrder: 3 },
        { id: 5, key: 'MPPT', value: 'Yes', displayOrder: 4 },
        { id: 6, key: 'Display', value: 'LCD', displayOrder: 5 }
      ]
    },
    {
      id: 2, name: 'S.O Series 4 KW Inverter', slug: 'so-series-4kw-inverter',
      shortDescription: 'High-power 4KW hybrid solar inverter with 48V battery support for medium to large homes.',
      description: '<p>The S.O Series 4 KW Inverter is the ideal choice for medium to large homes and small businesses. It delivers reliable power backup and efficient solar energy conversion.</p><p>With a 48V battery system, it supports larger battery banks for extended backup time.</p>',
      category: ProductCategory.Inverter, categoryName: 'Inverter',
      isFeatured: false, isActive: true, displayOrder: 1,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      images: [{ id: 2, imageUrl: '/images/products/inverter-4kw.png', altText: 'S.O Series 4 KW Inverter', isPrimary: true, displayOrder: 0 }],
      specifications: [
        { id: 5, key: 'Power Output', value: '4000W', displayOrder: 0 },
        { id: 6, key: 'Battery Voltage', value: '48V', displayOrder: 1 },
        { id: 7, key: 'Wave Form', value: 'Pure Sine Wave', displayOrder: 2 },
        { id: 8, key: 'Warranty', value: '5 Years', displayOrder: 3 },
        { id: 9, key: 'MPPT', value: 'Yes', displayOrder: 4 },
        { id: 10, key: 'Display', value: 'LCD', displayOrder: 5 }
      ]
    },
    {
      id: 3, name: 'S.O Series 6.2 KW Inverter', slug: 'so-series-6-2kw-inverter',
      shortDescription: 'Industrial-grade 6.2KW hybrid inverter for large homes and businesses.',
      description: '<p>The S.O Series 6.2 KW Inverter is our flagship product for large residential and commercial applications. It handles heavy loads with ease and provides superior solar energy management.</p>',
      category: ProductCategory.Inverter, categoryName: 'Inverter',
      isFeatured: true, isActive: true, displayOrder: 2,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      images: [{ id: 3, imageUrl: '/images/products/inverter-6.2kw.png', altText: 'S.O Series 6.2 KW Inverter', isPrimary: true, displayOrder: 0 }],
      specifications: [
        { id: 9, key: 'Power Output', value: '6200W', displayOrder: 0 },
        { id: 10, key: 'Battery Voltage', value: '48V', displayOrder: 1 },
        { id: 11, key: 'Wave Form', value: 'Pure Sine Wave', displayOrder: 2 },
        { id: 12, key: 'Warranty', value: '5 Years', displayOrder: 3 },
        { id: 13, key: 'MPPT', value: 'Yes', displayOrder: 4 },
        { id: 14, key: 'Efficiency', value: '98.5%', displayOrder: 5 }
      ]
    },
    {
      id: 4, name: 'S.O Lithium Battery 51.2V 105Ah', slug: 'so-lithium-battery-51v-105ah',
      shortDescription: 'LiFePO4 lithium battery with 51.2V 105Ah capacity.',
      description: '<p>The S.O Lithium Battery uses advanced LiFePO4 chemistry for superior safety, longevity, and performance. Perfect for residential solar systems.</p>',
      category: ProductCategory.Battery, categoryName: 'Battery',
      isFeatured: false, isActive: true, displayOrder: 3,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      images: [{ id: 4, imageUrl: '/images/products/battery-105ah.png', altText: 'S.O Lithium Battery 105Ah', isPrimary: true, displayOrder: 0 }],
      specifications: [
        { id: 13, key: 'Capacity', value: '105Ah', displayOrder: 0 },
        { id: 14, key: 'Voltage', value: '51.2V', displayOrder: 1 },
        { id: 15, key: 'Chemistry', value: 'LiFePO4', displayOrder: 2 },
        { id: 16, key: 'Warranty', value: '5 Years', displayOrder: 3 },
        { id: 17, key: 'Cycle Life', value: '6000+ Cycles', displayOrder: 4 },
        { id: 18, key: 'BMS', value: 'Built-in', displayOrder: 5 }
      ]
    },
    {
      id: 5, name: 'S.O Lithium Battery 51.2V 280Ah', slug: 'so-lithium-battery-51v-280ah',
      shortDescription: 'High-capacity LiFePO4 battery 51.2V 280Ah for whole-home backup power.',
      description: '<p>The S.O 280Ah Lithium Battery is our highest-capacity residential battery, providing extended backup power for entire homes during load shedding.</p>',
      category: ProductCategory.Battery, categoryName: 'Battery',
      isFeatured: true, isActive: true, displayOrder: 4,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      images: [{ id: 5, imageUrl: '/images/products/battery-280ah.png', altText: 'S.O Lithium Battery 280Ah', isPrimary: true, displayOrder: 0 }],
      specifications: [
        { id: 17, key: 'Capacity', value: '280Ah', displayOrder: 0 },
        { id: 18, key: 'Voltage', value: '51.2V', displayOrder: 1 },
        { id: 19, key: 'Chemistry', value: 'LiFePO4', displayOrder: 2 },
        { id: 20, key: 'Warranty', value: '5 Years', displayOrder: 3 },
        { id: 21, key: 'Cycle Life', value: '6000+ Cycles', displayOrder: 4 },
        { id: 22, key: 'BMS', value: 'Built-in', displayOrder: 5 }
      ]
    },
    {
      id: 6, name: 'S.O Mono Solar Panel 585W', slug: 'so-mono-solar-panel-585w',
      shortDescription: 'High-efficiency 585W Mono PERC solar panel with 21.5% efficiency.',
      description: '<p>The S.O 585W Monocrystalline PERC Solar Panel delivers exceptional performance even in low-light conditions. Built to last 25+ years with minimal degradation.</p>',
      category: ProductCategory.SolarPanel, categoryName: 'SolarPanel',
      isFeatured: true, isActive: true, displayOrder: 5,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      images: [{ id: 6, imageUrl: '/images/products/solar-panel.png', altText: 'S.O Mono Solar Panel 585W', isPrimary: true, displayOrder: 0 }],
      specifications: [
        { id: 21, key: 'Power', value: '585W', displayOrder: 0 },
        { id: 22, key: 'Type', value: 'Mono PERC', displayOrder: 1 },
        { id: 23, key: 'Efficiency', value: '21.5%', displayOrder: 2 },
        { id: 24, key: 'Warranty', value: '25 Years', displayOrder: 3 },
        { id: 25, key: 'Dimensions', value: '2278 x 1134 x 35mm', displayOrder: 4 },
        { id: 26, key: 'Weight', value: '28.5 kg', displayOrder: 5 }
      ]
    }
  ];

  getAll(category?: ProductCategory): Observable<Product[]> {
    let products = this.mockProducts.filter(p => p.isActive);
    if (category !== undefined) products = products.filter(p => p.category === category);
    return of(products.map(p => ({ ...p, primaryImage: p.images.find(i => i.isPrimary) || p.images[0] }))).pipe(delay(300));
  }

  getFeatured(): Observable<Product[]> {
    return of(this.mockProducts
      .filter(p => p.isFeatured && p.isActive)
      .map(p => ({ ...p, primaryImage: p.images.find(i => i.isPrimary) || p.images[0] }))
    ).pipe(delay(300));
  }

  getById(id: number): Observable<Product | undefined> {
    const p = this.mockProducts.find(p => p.id === id);
    return of(p ? { ...p, primaryImage: p.images.find(i => i.isPrimary) || p.images[0] } : undefined).pipe(delay(200));
  }

  getBySlug(slug: string): Observable<Product | undefined> {
    const p = this.mockProducts.find(p => p.slug === slug);
    return of(p ? { ...p, primaryImage: p.images.find(i => i.isPrimary) || p.images[0] } : undefined).pipe(delay(200));
  }

  getRelated(productId: number, count = 3): Observable<Product[]> {
    const product = this.mockProducts.find(p => p.id === productId);
    if (!product) return of([]);
    return of(
      this.mockProducts
        .filter(p => p.category === product.category && p.id !== productId && p.isActive)
        .slice(0, count)
        .map(p => ({ ...p, primaryImage: p.images.find(i => i.isPrimary) || p.images[0] }))
    ).pipe(delay(200));
  }

  getAllAdmin(): Observable<Product[]> {
    return of([...this.mockProducts].map(p => ({ ...p, primaryImage: p.images.find(i => i.isPrimary) || p.images[0] }))).pipe(delay(300));
  }

  create(dto: CreateProductDto): Observable<Product> {
    const newProduct: Product = {
      ...dto, id: Date.now(), slug: dto.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      categoryName: ProductCategory[dto.category], createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(), images: [], specifications: []
    };
    this.mockProducts.push(newProduct);
    return of(newProduct).pipe(delay(300));
  }

  update(id: number, dto: UpdateProductDto): Observable<Product> {
    const idx = this.mockProducts.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.mockProducts[idx] = { ...this.mockProducts[idx], ...dto, updatedAt: new Date().toISOString() };
    }
    return of(this.mockProducts[idx]).pipe(delay(300));
  }

  delete(id: number): Observable<void> {
    this.mockProducts = this.mockProducts.filter(p => p.id !== id);
    return of(undefined).pipe(delay(300));
  }
}
