import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { PageMode } from 'src/app/shared/enums/storage-mode.enum';
import { StorageService } from 'src/app/storage/storage.service';
import { TitlePageService } from 'src/app/title-page.service';
import { ISupplier } from '../model/supplier-model';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.css']
})
export class SupplierDetailsComponent implements OnInit, AfterViewInit {
  @Input() supplierMode!: PageMode;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  
  title: string = "Supplier details"
  supplierForm?: FormGroup
  supplier?: ISupplier;
  supplierId: number = -1;
  dataToDisplay = new MatTableDataSource();
  displayedColumns = ['name', 'type', 'quantity', 'status', 'supplier', 'created', 'modified'];
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private titleService: TitlePageService, private storageService: StorageService,
    private router: Router) {}


  ngOnInit(): void {
    this.getTitle();
    this.titleService.setTitle(this.title);
    this.supplierForm = this.getSupplierForm();
    if (this.supplierMode == PageMode.EDIT || this.supplierMode == PageMode.VIEW) {
      this.activatedRoute.paramMap.subscribe(param => {
        this.supplierId = Number(param.get('id'));
        this.storageService.getProductsForSupplier(this.supplierId).subscribe(products => {
          this.dataToDisplay.data = products;          
        });
      })
    }
  }

  ngAfterViewInit(): void {
    this.dataToDisplay.paginator = this.paginator;
    this.dataToDisplay.sort = this.matSort
  }

  getTitle(): void {
    if (this.supplierMode == PageMode.ADD) {
      this.title = "Add supplier";
    } else {
      this.title = "Supplier details";
    }
  }

  getSupplierForm(): FormGroup {
    return this.fb.group({
      name: new FormControl({value: '', disabled: this.isDisabledForm()}),
      numberOfProducts: new FormControl({ value: '', disabled: this.isDisabledForm()}),
      supplierCode: new FormControl({value: '', disabled: this.isDisabledForm()}),
      address: new FormControl({value: '', disabled: this.isDisabledForm()}),
      phoneNumber: new FormControl({value: '', disabled: this.isDisabledForm()}),
      zipCode: new FormControl({value: '', disabled: this.isDisabledForm()}),
      country: new FormControl({value: '', disabled: this.isDisabledForm()}),
    })
  }

  fillFormValues(): void {
    this.supplierForm?.get('name') == this.supplier?.name;
  }


  isAddMode(): boolean {
    return this.supplierMode == PageMode.ADD;
  }

  isEditMode(): boolean {
    return this.supplierMode == PageMode.EDIT;
  }

  isViewMode(): boolean {
    return this.supplierMode == PageMode.VIEW;
  }

  isDisabledForm(): boolean {
    return this.supplierMode == PageMode.VIEW;
  }

  errorHanlder(formControlName: string, errorId: string): boolean | undefined {
    return this.supplierForm?.controls[formControlName].touched && this.supplierForm?.controls[formControlName].hasError(errorId);
  }

  getProductDetails(productId: number) {
    this.router.navigate(['products',productId, 'view'])
  }

}
