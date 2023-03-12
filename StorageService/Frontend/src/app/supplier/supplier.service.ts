import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISupplier } from './model/supplier-model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private cachedSuppliers: ISupplier[] = [];
  constructor(private http: HttpClient) { }

  getSuppliers(): Observable<ISupplier[]> {
    return this.http.get<ISupplier[]>("/app/supplier");
  }

  getSupplier(supplierId: string): Observable<ISupplier> {
    return this.http.get<ISupplier>("/app/supplier" + "/" + supplierId);
  }

  resetCachedSuppliers() {
    this.cachedSuppliers = [];
  }

  getCachedSuppliers(): ISupplier[] {
    return this.cachedSuppliers;
  }

  setCachedSuppliers(suppliers: ISupplier[]) {
    this.cachedSuppliers = suppliers;
  }

  isSuppliersCached(): boolean {
    return this.cachedSuppliers.length > 0;
  }

}
