import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PageMode } from 'src/app/shared/enums/storage-mode.enum';
import { ISupplier } from '../model/supplier-model';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.css']
})
export class SupplierDetailsComponent implements OnInit {
  @Input() supplierMode!: PageMode;
  supplierForm?: FormGroup
  supplier?: ISupplier;
  supplierId: number = -1;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute) {}


  ngOnInit(): void {
    this.supplierForm = this.getSupplierForm();
    if (this.supplierMode == PageMode.EDIT) {
      this.activatedRoute.paramMap.subscribe(param => {
        this.supplierId = Number(param.get('id'));
      })
    }
  }

  getSupplierForm(): FormGroup {
    return this.fb.group({
      name: new FormControl({value: '', disabled: this.isDisabledForm()}),
      numberOfProducts: new FormControl({ value: '', disabled: this.isDisabledForm()})
    })
  }

  fillFormValues(): void {
    this.supplierForm?.get('name') == this.supplier?.name;
  }


  isAddMode() {
    return this.supplierMode == PageMode.ADD;
  }

  isEditMode() {
    return this.supplierMode == PageMode.EDIT;
  }

  isViewMode() {
    return this.supplierMode == PageMode.VIEW;
  }

  isDisabledForm() {
    return this.supplierMode == PageMode.VIEW;
  }
}
