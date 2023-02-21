import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Product } from './model/product-model';
import { Observable } from 'rxjs';
import { FilterParams } from './model/filterParams-model';
import { IStatus } from './model/status-model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

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

}
