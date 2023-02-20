import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISupplier } from './model/supplier-model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }
  baseURL: string = 'http://localhost:8080/supplier'


  getSuppliers(): Observable<ISupplier[]> {
    return this.http.get<ISupplier[]>(this.baseURL);
  }

  getNumberOfProducts(supplierId: number) {
    return this.http.get<ISupplier>(this.baseURL + "/product-count/" + supplierId);
  }

  getSupplier(supplierId: string): Observable<ISupplier> {
    return this.http.get<ISupplier>(this.baseURL + "/" + supplierId);
  }

}
