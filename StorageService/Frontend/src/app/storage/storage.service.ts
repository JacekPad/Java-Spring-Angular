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

  private baseUrl: string = "http://localhost:8080/storage";

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + "/" + productId);
  }

  createProduct(product: Product): void {
    this.http.post<Product>(this.baseUrl + "/add", product);
  }

  getProductsFiltered(params: FilterParams): Observable<Product[]> {
    return this.http.post<Product[]>(this.baseUrl, params);
  }

  getStatus(): Observable<IStatus[]> {
    return this.http.get<IStatus[]>(this.baseUrl + "/status");
  }

}
