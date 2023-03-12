import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PageMode } from 'src/app/shared/enums/storage-mode.enum';
import { ISupplier } from 'src/app/supplier/model/supplier-model';
import { SupplierService } from 'src/app/supplier/supplier.service';
import { TitlePageService } from 'src/app/title-page.service';
import { Product } from '../model/product-model';
import { IStatus } from '../model/status-model';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-storage-details',
  templateUrl: './storage-details.component.html',
  styleUrls: ['./storage-details.component.css']
})
export class StorageDetailsComponent implements OnInit {

  constructor(private storageService: StorageService, private activatedRoute: ActivatedRoute, private fb: FormBuilder,
    private titleService: TitlePageService, private supplierService: SupplierService) { };

  
  title: string = ""
  @Input() storageMode!: PageMode;
  product?: Product
  selectedId: number = -1;
  productForm?: FormGroup;
  statusList!: IStatus[];
  suppliers?: ISupplier[];

  ngOnInit(): void {
    this.getTitle();
    this.titleService.setTitle(this.title);
    this.getStatusList();
    this.getSuppliers();
    this.productForm = this.getProductForm();
    if (this.storageMode != PageMode.ADD) {
      this.activatedRoute.paramMap.subscribe(param => {
        this.selectedId = Number(param.get('id'));
      })
    }
    if (this.storageMode == PageMode.VIEW) {
      this.storageService.getProduct(this.selectedId).subscribe(product => {
        this.product = product;
        this.fillFormValues();
        this.getProductData();
      })
    }
    if (this.storageMode == PageMode.ADD) {
      this.product = new Product();
      this.getProductData();
    }
  }

  getTitle() {
    if (this.storageMode == PageMode.ADD) {
      this.title = "Add product"
    } else {
      this.title = "Product details";
    }
  }

  getProductForm(): FormGroup {
    return this.fb.group({
      name: new FormControl({ value: null, disabled: this.isDisabled()}, Validators.required),
      type: new FormControl({ value: '', disabled: this.isDisabled() }, Validators.required),
      quantity: new FormControl({ value: '', disabled: this.isDisabled()}, this.quantityValidator()),
      status: new FormControl({ value: '', disabled: this.isDisabled() }, Validators.required),
      supplier: new FormControl({ value: '', disabled: this.isDisabled()}, Validators.required),
    });
  }

  isDisabled(): boolean {
    return this.storageMode == PageMode.VIEW;
  }

  fillFormValues(): void {
    this.productForm?.get('name')?.setValue(this.product?.name);
    this.productForm?.get('type')?.setValue(this.product?.type);
    this.productForm?.get('quantity')?.setValue(this.product?.quantity);
    this.productForm?.get('status')?.setValue(this.product?.status);
    this.productForm?.get('supplier')?.setValue(this.product?.supplier);
    this.productForm?.get('created')?.setValue(this.product?.created);
    this.productForm?.get('modified')?.setValue(this.product?.modified);
  }

  editProduct() {
    this.storageMode = PageMode.EDIT;
    this.productForm?.enable();
  }

  saveProduct() {
    console.log(this.productForm);
    this.productForm?.markAllAsTouched();
    if (this.product && this.productForm?.status == 'VALID') {
      this.storageService.saveProduct(this.product);
    }
    this.storageService.resetCachedProducts();
  }

  errorHanlder(formControlName: string, errorId: string): boolean | undefined {
    return this.productForm?.controls[formControlName].touched && this.productForm?.controls[formControlName].hasError(errorId);
  }

  quantityValidator(): Validators {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;      
      if ((!value || value == "" || value <= 0)) {
        return {required: true};
      }
      return null;
    }
  }

  getProductData(): void {
    this.productForm?.valueChanges.subscribe(form => {
      if (this.product) {
        this.product.name = form.name;
        this.product.type = form.type;
        this.product.quantity = form.quantity;
        this.product.status = form.status;
        this.product.supplier = form.supplier;
      }
    });
  }

  isEditMode(): boolean {
    return this.storageMode == PageMode.EDIT;
  }

  isViewMode(): boolean {
    return this.storageMode == PageMode.VIEW;
  }
  isAddMode(): boolean {
    return this.storageMode == PageMode.ADD;
  }

  getStatusList() {
    this.storageService.getStatus().subscribe(resp => {
      this.statusList = resp;
    });
  }

  getSuppliers() {
    if (this.supplierService.isSuppliersCached()) {
      this.suppliers = this.supplierService.getCachedSuppliers();
    } else {
      this.supplierService.getSuppliers().subscribe(suppliers => {
        this.suppliers = suppliers;
      });
    }
  }

}




