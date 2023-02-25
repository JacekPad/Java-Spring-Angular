import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierAddComponent } from './supplier-add/supplier-add.component';
import { SupplierEditComponent } from './supplier-edit/supplier-edit.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierViewComponent } from './supplier-view/supplier-view.component';

const routes: Routes = [
  { path: 'supplier', component: SupplierListComponent },
  { path: 'supplier/add', component: SupplierAddComponent },
  {
    path: 'supplier/:id', children: [
      { path: 'edit', component: SupplierEditComponent },
      { path: 'view', component: SupplierViewComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
