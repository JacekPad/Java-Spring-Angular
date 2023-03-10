import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../storage.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IFilterParams } from '../model/filterParams-model';
import { IStatus } from '../model/status-model';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SupplierService } from 'src/app/supplier/supplier.service';
import { ISupplier } from 'src/app/supplier/model/supplier-model';
import { TitlePageService } from 'src/app/title-page.service';

@Component({
  selector: 'app-storage-list',
  templateUrl: './storage-list.component.html',
  styleUrls: ['./storage-list.component.css']
})
export class StorageListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  title: string = "Product list";
  dataToDisplay = new MatTableDataSource();
  displayedColumns = ['name', 'type', 'quantity', 'status', 'supplier', 'created', 'modified'];
  searchFilterForm!: FormGroup;
  statusList?: IStatus[];
  supplierList?: ISupplier[];
  searchValues: IFilterParams = {
    name: '',
    type: '',
    supplier: '',
    status: '',
    quantityMin: 0,
    quantityMax: -1,
    created: this.getInitDate()
  }

  constructor(private storageService: StorageService, private fb: FormBuilder, private router: Router, private datePipe: DatePipe,
     private supplierService: SupplierService, private titleService: TitlePageService) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.getSuppliers().subscribe(suppliers => {
      this.supplierList = suppliers;
    });
    this.getStatusList();
    if (this.isProductsCashed()) {
      this.dataToDisplay.data = this.storageService.getCachedProducts();
    } else {
      this.getProductList();
    }
    this.searchFilterForm = this.getFilterForm();
    this.updateSearchValues();
  }

  ngAfterViewInit(): void {
    // Add pagination + sorting to the table
    this.dataToDisplay.paginator = this.paginator;
    this.dataToDisplay.sort = this.matSort
  }

  isProductsCashed(): boolean {
    return this.storageService.isProductsCached();
  }

  getInitDate(): Date {
    return new Date();
  }

  getProductDetails(productId: number) {
    this.router.navigate(['products',productId, 'view'])
  }

  searchButton() {
    this.storageService.resetCachedProducts();
    this.getProductList();
  }

  updateSearchValues() {
    // map form values to the filterObject
    this.searchFilterForm.valueChanges.subscribe(form => {
      this.searchValues.name = form.name;
      this.searchValues.type = form.type;
      this.searchValues.supplier = form.supplier;
      this.searchValues.status = form.status;
      this.searchValues.quantityMin = form.quantityMin;
      this.searchValues.quantityMax = form.quantityMax;
      this.searchValues.created = form.created;
    });
  }

  getFilterForm(): FormGroup {
    let form: FormGroup = this.fb.group({
      name: new FormControl({ value: this.searchValues.name, disabled: false }),
      type: new FormControl({ value: this.searchValues.type, disabled: false }),
      supplier: new FormControl({ value: this.searchValues.supplier, disabled: false }),
      status: new FormControl({ value: this.searchValues.status, disabled: false }),
      quantityMin: new FormControl({ value: this.searchValues.quantityMin, disabled: false }),
      quantityMax: new FormControl({ value: this.searchValues.quantityMax, disabled: false }),
      created: new FormControl({ value: this.searchValues.created, disabled: false }),
    })
    return form;
  }

  getProductList() {
    // get products from backend and map correct status value to each product
    this.storageService.getProductsFiltered(this.searchValues).subscribe(products => {
      this.dataToDisplay.data = products;
      this.storageService.setCachedProducts(products);
      products.forEach(product => {
        this.statusList?.forEach(status => {
          if (product.status == status.code) {
            product.status = status.value;
            }
        });
        this.supplierList?.forEach(supplier => {
          if (supplier.id.toString() == product.supplier) {
              product.supplier = supplier.name;
          }
        })
      });
    });
  }

  getStatusList() {
    this.storageService.getStatus().subscribe(resp => {
      this.statusList = resp;
    });
  }

  getSuppliers(): Observable<ISupplier[]> {
    return this.supplierService.getSuppliers();
  }

  resetFilters() {
    this.clearSearchValues();
  }

  clearSearchValues() {
    this.searchFilterForm.patchValue({
      name: "",
      type: "",
      supplier: "",
      status: "",
      quantityMin: 0,
      quantityMax: -1,
    });
  }


}

