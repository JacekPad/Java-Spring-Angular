import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISupplier } from './model/supplier-model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  getSuppliers(): Observable<ISupplier[]> {
    return this.http.get<ISupplier[]>("/app/supplier");
  }

  getNumberOfProducts(supplierId: number) {
    return this.http.get<ISupplier>("/app/supplier" + "/product-count/" + supplierId);
  }

  getSupplier(supplierId: string): Observable<ISupplier> {
    return this.http.get<ISupplier>("/app/supplier" + "/" + supplierId);
  }

}
