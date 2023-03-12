import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IProduct, Product } from './model/product-model';
import { Observable } from 'rxjs';
import { FilterParams } from './model/filterParams-model';
import { IStatus } from './model/status-model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private cachedProducts: IProduct[] = [];

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>("/app/storage");
  }

  getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>("/app/storage" + "/" + productId);
  }

  saveProduct(product: Product): void {
    this.http.post<Product>("/app/storage" + "/add", product).subscribe();
  }

  getProductsFiltered(params: FilterParams): Observable<Product[]> {
    return this.http.post<Product[]>("/app/storage", params);
  }

  getStatus(): Observable<IStatus[]> {
    return this.http.get<IStatus[]>("/app/storage" + "/status");
  }

  getProductsForSupplier(supplierId: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>("/app/storage/supplier-products/" + supplierId);
  }

  getNumberOfProductsForSupplier(supplierId: number): Observable<number> {
    return this.http.get<number>("/app/storage/product-count/" + supplierId);
  }

  isProductsCached(): boolean {
    return this.cachedProducts.length > 0
  }
  
  resetCachedProducts() {
    this.cachedProducts = [];
  }

  getCachedProducts(): IProduct[] {
    return this.cachedProducts;
  }

  setCachedProducts(products: IProduct[]) {
    this.cachedProducts = products;
  }


}
