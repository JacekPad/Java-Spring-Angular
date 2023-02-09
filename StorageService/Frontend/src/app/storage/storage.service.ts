import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Product } from './model/product-model';
import { Observable } from 'rxjs';
import { FilterParams } from './model/filterParams-model';

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
    return this.http.get<Product>(this.baseUrl + productId);
  }

  createProduct(product: Product): void {
    this.http.post<Product>(this.baseUrl + "add", product);
  }

  getProductsFiltered(params: FilterParams): void {
    console.log("posting");
    console.log(this.baseUrl);
    this.http.post<void>(this.baseUrl, params).subscribe();
  }

}
