import { Component, OnInit, HostListener } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Product, ProductCategory, CreateProductDto } from '../../../core/models/product.model';
import { NotificationService } from '../../../core/services/notification.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-admin-products',
  standalone: false,
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = true;
  showForm = false;
  editingProduct: Product | null = null;
  deleteDialogVisible = false;
  productToDelete: Product | null = null;
  searchQuery = '';
  filterCategory: ProductCategory | '' = '';
  filterStatus: '' | 'active' | 'inactive' = '';

  selectedIds = new Set<number>();
  bulkDeleteDialogVisible = false;

  categories = [
    { label: 'All', value: '' },
    { label: 'Inverter', value: ProductCategory.Inverter },
    { label: 'Battery', value: ProductCategory.Battery },
    { label: 'Solar Panel', value: ProductCategory.SolarPanel },
    { label: 'Accessory', value: ProductCategory.Accessory }
  ];

  form: CreateProductDto = { name: '', shortDescription: '', description: '', category: ProductCategory.Inverter, isFeatured: false, isActive: true, displayOrder: 0 };
  saving = false;
  ProductCategory = ProductCategory;

  constructor(
    private productService: ProductService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void { this.loadProducts(); }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    if ((e.ctrlKey || e.metaKey) && e.key === 's' && this.showForm) {
      e.preventDefault();
      this.saveProduct();
    }
    if (e.key === 'Escape' && this.showForm) { this.closeForm(); }
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAllAdmin().subscribe({
      next: (products) => { this.products = products; this.applyFilters(); this.loading = false; },
      error: () => { this.notificationService.error('Failed to load products.'); this.loading = false; }
    });
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(p => {
      const matchSearch = !this.searchQuery || p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || p.shortDescription.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchCat = this.filterCategory === '' || p.category === Number(this.filterCategory);
      const matchStatus = this.filterStatus === '' || (this.filterStatus === 'active' ? p.isActive : !p.isActive);
      return matchSearch && matchCat && matchStatus;
    });
  }

  openCreate(): void {
    this.editingProduct = null;
    this.form = { name: '', shortDescription: '', description: '', category: ProductCategory.Inverter, isFeatured: false, isActive: true, displayOrder: this.products.length };
    this.showForm = true;
  }

  openEdit(product: Product): void {
    this.editingProduct = product;
    this.form = { name: product.name, shortDescription: product.shortDescription, description: product.description || '', category: product.category, isFeatured: product.isFeatured, isActive: product.isActive, displayOrder: product.displayOrder };
    this.showForm = true;
  }

  closeForm(): void { this.showForm = false; this.editingProduct = null; }

  saveProduct(): void {
    if (!this.form.name.trim()) { this.notificationService.error('Product name is required.'); return; }
    this.saving = true;
    const op = this.editingProduct
      ? this.productService.update(this.editingProduct.id, this.form)
      : this.productService.create(this.form);
    op.subscribe({
      next: () => {
        this.notificationService.success(this.editingProduct ? 'Product updated!' : 'Product created!');
        this.closeForm();
        this.loadProducts();
        this.saving = false;
      },
      error: () => { this.notificationService.error('Failed to save product.'); this.saving = false; }
    });
  }

  confirmDelete(product: Product): void { this.productToDelete = product; this.deleteDialogVisible = true; }

  onDeleteConfirmed(): void {
    if (!this.productToDelete) return;
    this.productService.delete(this.productToDelete.id).subscribe({
      next: () => { this.notificationService.success('Product deleted.'); this.loadProducts(); this.productToDelete = null; },
      error: () => this.notificationService.error('Failed to delete product.')
    });
  }

  duplicateProduct(product: Product): void {
    const dto: CreateProductDto = { name: product.name + ' (Copy)', shortDescription: product.shortDescription, description: product.description || '', category: product.category, isFeatured: false, isActive: false, displayOrder: this.products.length };
    this.productService.create(dto).subscribe({
      next: () => { this.notificationService.success('Product duplicated.'); this.loadProducts(); },
      error: () => this.notificationService.error('Failed to duplicate product.')
    });
  }

  toggleSelect(id: number): void { this.selectedIds.has(id) ? this.selectedIds.delete(id) : this.selectedIds.add(id); }
  toggleSelectAll(): void {
    if (this.selectedIds.size === this.filteredProducts.length) { this.selectedIds.clear(); }
    else { this.filteredProducts.forEach(p => this.selectedIds.add(p.id)); }
  }
  get allSelected(): boolean { return this.filteredProducts.length > 0 && this.selectedIds.size === this.filteredProducts.length; }

  bulkDelete(): void { if (this.selectedIds.size) this.bulkDeleteDialogVisible = true; }
  onBulkDeleteConfirmed(): void {
    const ids = Array.from(this.selectedIds);
    let done = 0;
    ids.forEach(id => {
      this.productService.delete(id).subscribe({ next: () => { done++; if (done === ids.length) { this.notificationService.success(`${ids.length} products deleted.`); this.selectedIds.clear(); this.loadProducts(); } } });
    });
  }

  exportCsv(): void {
    const headers = ['ID', 'Name', 'Category', 'Featured', 'Active', 'Display Order'];
    const rows = this.filteredProducts.map(p => [p.id, p.name, p.categoryName, p.isFeatured, p.isActive, p.displayOrder]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'products.csv'; a.click();
    URL.revokeObjectURL(url);
    this.notificationService.success('CSV exported!');
  }

  onDrop(event: CdkDragDrop<Product[]>): void {
    moveItemInArray(this.filteredProducts, event.previousIndex, event.currentIndex);
    const ids = this.filteredProducts.map(p => p.id);
    this.productService.reorder(ids).subscribe({ next: () => this.notificationService.success('Order saved.') });
  }

  getCategoryLabel(cat: ProductCategory): string {
    return ['', 'Inverter', 'Battery', 'Solar Panel', 'Accessory'][cat] || 'Unknown';
  }
}
