import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product-model';
import { StorageService } from '../storage.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IFilterParams } from '../model/filterParams-model';

@Component({
  selector: 'app-storage-list',
  templateUrl: './storage-list.component.html',
  styleUrls: ['./storage-list.component.css']
})
export class StorageListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  products: Observable<Product[]> | undefined;
  dataToDisplay = new MatTableDataSource();
  displayedColumns = ['name', 'type', 'quantity', 'status', 'supplier', 'created', 'modified'];
  searchFilterForm!: FormGroup;

  searchValues: IFilterParams = {
    name: '',
    type: '',
    supplier: '',
    status: '',
    quantityMin: 0,
    quantityMax: -1,
    created: this.getInitDate()
  }
  statuses = ["asdas","ASdasd","Asdasd","Asdasd"]

  constructor(private storageService: StorageService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.storageService.getProductsFiltered(this.searchValues).subscribe(resp => {
      this.dataToDisplay.data = resp
    })
    this.searchFilterForm = this.getFilterForm();
    this.updateSearchValues();
  }

  ngAfterViewInit(): void {
    // Add pagination + sorting to the table
    this.dataToDisplay.paginator = this.paginator;
    this.dataToDisplay.sort = this.matSort
  }

  getInitDate(): Date {
    return new Date();
  }

  getProductDetails(productId: number) {
    console.log(productId);
  }

  searchButton() {
    this.storageService.getProductsFiltered(this.searchValues).subscribe(resp => {
      this.dataToDisplay.data = resp
    });
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
    })
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

  getStatuses() {
    this.storageService.getStatus();
  }

}
