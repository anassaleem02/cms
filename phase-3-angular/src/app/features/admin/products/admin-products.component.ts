import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product, ProductCategory, CreateProductDto } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  standalone: false,
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  showForm = false;
  editingId: number | null = null;
  form!: FormGroup;
  isSaving = false;
  deleteConfirmId: number | null = null;

  ProductCategory = ProductCategory;
  categories = [
    { label: 'Inverter', value: ProductCategory.Inverter },
    { label: 'Battery', value: ProductCategory.Battery },
    { label: 'Solar Panel', value: ProductCategory.SolarPanel },
    { label: 'Accessory', value: ProductCategory.Accessory }
  ];

  constructor(private productService: ProductService, private fb: FormBuilder) {}

  ngOnInit(): void { this.loadProducts(); }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAllAdmin().subscribe(p => {
      this.products = p;
      this.loading = false;
    });
  }

  openCreate(): void {
    this.editingId = null;
    this.form = this.fb.group({
      name: ['', Validators.required],
      shortDescription: ['', Validators.required],
      description: [''],
      category: [ProductCategory.Inverter, Validators.required],
      isFeatured: [false],
      isActive: [true],
      displayOrder: [0]
    });
    this.showForm = true;
  }

  openEdit(product: Product): void {
    this.editingId = product.id;
    this.form = this.fb.group({
      name: [product.name, Validators.required],
      shortDescription: [product.shortDescription, Validators.required],
      description: [product.description],
      category: [product.category, Validators.required],
      isFeatured: [product.isFeatured],
      isActive: [product.isActive],
      displayOrder: [product.displayOrder]
    });
    this.showForm = true;
  }

  onSubmit(): void {
    if (this.form.invalid || this.isSaving) return;
    this.isSaving = true;
    const dto = this.form.value as CreateProductDto;
    const obs = this.editingId
      ? this.productService.update(this.editingId, dto)
      : this.productService.create(dto);
    obs.subscribe(() => {
      this.isSaving = false;
      this.showForm = false;
      this.loadProducts();
    });
  }

  confirmDelete(id: number): void { this.deleteConfirmId = id; }

  deleteProduct(): void {
    if (!this.deleteConfirmId) return;
    this.productService.delete(this.deleteConfirmId).subscribe(() => {
      this.deleteConfirmId = null;
      this.loadProducts();
    });
  }

  getCategoryLabel(category: ProductCategory): string {
    return this.categories.find(c => c.value === category)?.label || '';
  }

  get f() { return this.form.controls; }
}
