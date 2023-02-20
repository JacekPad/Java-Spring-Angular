import { Component, OnInit } from '@angular/core';
import { ISupplier, Supplier } from '../model/supplier-model';
import { SupplierService } from '../supplier.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit{

  constructor(private supplierService: SupplierService) { }
  dataToDisplay = new MatTableDataSource();
  displayedColumns = ['name', 'address', 'phoneNumber'];

  ngOnInit(): void {
    this.getSuppliers();
  }

  getSuppliers() {
    this.supplierService.getSuppliers().subscribe(suppliers => {
      this.dataToDisplay.data = suppliers
    });
  }

}