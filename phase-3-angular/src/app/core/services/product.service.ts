import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, ProductCategory, CreateProductDto, UpdateProductDto } from '../models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private base = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getAll(category?: ProductCategory): Observable<Product[]> {
    let params = new HttpParams();
    if (category !== undefined) params = params.set('category', category.toString());
    return this.http.get<Product[]>(this.base, { params }).pipe(
      map(products => products.map(p => ({ ...p, primaryImage: p.images?.find(i => i.isPrimary) || p.images?.[0] })))
    );
  }

  getFeatured(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.base}/featured`).pipe(
      map(products => products.map(p => ({ ...p, primaryImage: p.images?.find(i => i.isPrimary) || p.images?.[0] })))
    );
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.base}/${id}`).pipe(
      map(p => ({ ...p, primaryImage: p.images?.find(i => i.isPrimary) || p.images?.[0] }))
    );
  }

  getBySlug(slug: string): Observable<Product> {
    return this.http.get<Product>(`${this.base}/slug/${slug}`).pipe(
      map(p => ({ ...p, primaryImage: p.images?.find(i => i.isPrimary) || p.images?.[0] }))
    );
  }

  getRelated(productId: number, count = 3): Observable<Product[]> {
    return this.http.get<Product[]>(this.base).pipe(
      map(products => products
        .filter(p => p.id !== productId && p.isActive)
        .slice(0, count)
        .map(p => ({ ...p, primaryImage: p.images?.find(i => i.isPrimary) || p.images?.[0] }))
      )
    );
  }

  getAllAdmin(): Observable<Product[]> {
    return this.http.get<Product[]>(this.base).pipe(
      map(products => products.map(p => ({ ...p, primaryImage: p.images?.find(i => i.isPrimary) || p.images?.[0] })))
    );
  }

  create(dto: CreateProductDto): Observable<Product> {
    return this.http.post<Product>(this.base, dto);
  }

  update(id: number, dto: UpdateProductDto): Observable<Product> {
    return this.http.put<Product>(`${this.base}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  addImage(productId: number, dto: { imageUrl: string; altText: string; isPrimary: boolean; displayOrder: number }): Observable<any> {
    return this.http.post(`${this.base}/${productId}/images`, dto);
  }

  deleteImage(productId: number, imageId: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${productId}/images/${imageId}`);
  }

  addSpec(productId: number, dto: { key: string; value: string; displayOrder: number }): Observable<any> {
    return this.http.post(`${this.base}/${productId}/specs`, dto);
  }

  updateSpec(productId: number, specId: number, dto: { key: string; value: string }): Observable<any> {
    return this.http.put(`${this.base}/${productId}/specs/${specId}`, dto);
  }

  deleteSpec(productId: number, specId: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${productId}/specs/${specId}`);
  }

  reorder(ids: number[]): Observable<void> {
    return this.http.put<void>(`${this.base}/reorder`, ids);
  }
}
