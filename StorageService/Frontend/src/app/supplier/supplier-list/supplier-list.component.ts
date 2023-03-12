import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ISupplier, Supplier } from '../model/supplier-model';
import { SupplierService } from '../supplier.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { TitlePageService } from 'src/app/title-page.service';
import { StorageService } from 'src/app/storage/storage.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit, AfterViewInit {

  constructor(private supplierService: SupplierService, private router: Router, private titleService: TitlePageService, private storageService: StorageService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  dataToDisplay = new MatTableDataSource();
  displayedColumns = ['name', 'supplierCode', 'numberOfProducts', 'created', 'modified'];
  title: string = "Supplier list"

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
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
        this.storageService.getNumberOfProductsForSupplier(supplier.id).subscribe(count => {
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

  isSuppliersCached(): boolean {
    return this.supplierService.isSuppliersCached();
  }

}
