import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product-model';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-storage-details',
  templateUrl: './storage-details.component.html',
  styleUrls: ['./storage-details.component.css']
})
export class StorageDetailsComponent implements OnInit {

  constructor(private storageService: StorageService, private activatedRoute: ActivatedRoute, private fb: FormBuilder) { };



  product?: Product
  selectedId: number = -1;
  productForm?: FormGroup;
  isViewMode: boolean = false;



  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      this.isViewMode = param.get('isViewMode') === 'true';
      this.selectedId = Number(param.get('id'));
      if (this.selectedId > 0 && this.isViewMode) {
        this.storageService.getProduct(this.selectedId).subscribe(prodcut => {
          this.product = prodcut;
          this.fillFormValues();
        });
      };
    });
    this.productForm = this.getProductForm();

  }

  getProductForm(): FormGroup {
    return this.fb.group({
      name: new FormControl({ value: '', disabled: this.isDisabled() }),
      type: new FormControl({ value: '', disabled: this.isDisabled() }),
      quantity: new FormControl({ value: '', disabled: this.isDisabled() }),
      status: new FormControl({ value: '', disabled: this.isDisabled() }),
      supplier: new FormControl({ value: '', disabled: this.isDisabled() }),
      created: new FormControl({ value: '', disabled: this.isDisabled() }),
      modified: new FormControl({ value: '', disabled: this.isDisabled() })
    });
  }

  isDisabled(): boolean {
    return this.isViewMode;
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
    this.isViewMode = false;
    this.productForm?.enable();
  }

  saveProduct() {
    let product: Product = new Product();
    if (!this.product) {
      product = this.getProductData();
    } else {
      product = this.product;
    }
    if (this.validateForm()){
      this.storageService.createProduct(product);
    }

  }

  getProductData(): Product {
    let product: Product = new Product();
    product.name = this.productForm?.get('name')?.value;
    product.type = this.productForm?.get('type')?.value;
    product.quantity = this.productForm?.get('quantity')?.value;
    product.status = this.productForm?.get('status')?.value;
    product.supplier = this.productForm?.get('supplier')?.value;
    product.created = this.productForm?.get('created')?.value;
    product.modified = this.productForm?.get('modified')?.value;
    return product;
  }

  validateForm():boolean {
      return false;
  }

}




