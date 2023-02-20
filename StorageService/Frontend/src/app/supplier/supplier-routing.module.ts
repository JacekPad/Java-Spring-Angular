import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierAddComponent } from './supplier-add/supplier-add.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';
import { SupplierEditComponent } from './supplier-edit/supplier-edit.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierViewComponent } from './supplier-view/supplier-view.component';

const routes: Routes = [
{path: 'supplier', component: SupplierListComponent},
{path: 'supplier/:id', children: [
  {path: 'add', component: SupplierAddComponent},
  {path: 'edit', component: SupplierEditComponent},
  {path: 'view', component: SupplierViewComponent},
  {path: '', component: SupplierDetailsComponent},
]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
