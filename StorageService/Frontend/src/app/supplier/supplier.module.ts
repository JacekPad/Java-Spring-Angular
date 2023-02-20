import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierViewComponent } from './supplier-view/supplier-view.component';
import { SupplierEditComponent } from './supplier-edit/supplier-edit.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';
import { SupplierAddComponent } from './supplier-add/supplier-add.component';

@NgModule({
  declarations: [
    SupplierListComponent,
    SupplierViewComponent,
    SupplierEditComponent,
    SupplierDetailsComponent,
    SupplierAddComponent
  ],
  imports: [
    CommonModule,
    SupplierRoutingModule, 
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SupplierModule { }
