import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ISupplier, Supplier } from '../model/supplier-model';
import { SupplierService } from '../supplier.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit, AfterViewInit{

  constructor(private supplierService: SupplierService, private router: Router) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  dataToDisplay = new MatTableDataSource();
  displayedColumns = ['name','numberOfProducts'];
  

  ngOnInit(): void {
    if (this.isSuppliersCached()) {
      this.dataToDisplay.data = this.supplierService.getCachedSuppliers();
    } else {
      this.getSuppliers();
    }
  }

  
  ngAfterViewInit(): void {
    this.dataToDisplay.paginator = this.paginator;
    this.dataToDisplay.sort = this.matSort
    }

  getSuppliers() {
    this.supplierService.getSuppliers().subscribe(suppliers => {
      suppliers.forEach(supplier => {
        this.supplierService.getNumberOfProducts(supplier.id).subscribe(count => {
          supplier.numberOfProducts = count
        });
      })
      this.dataToDisplay.data = suppliers
      this.supplierService.setCachedSuppliers(suppliers);
    });
  }

  getSupplierDetails(rowId: number) {
    this.router.navigate(['supplier', rowId, 'view'])
    console.log(rowId);
  }

  getNumberOfProducts(supplierId: number) {
    this.supplierService.getNumberOfProducts(supplierId);
  }

  isSuppliersCached(): boolean {
    return this.supplierService.isSuppliersCached();
  }

}
