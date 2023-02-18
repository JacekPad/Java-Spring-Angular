import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StorageAddComponent } from './storage-add/storage-add.component';
import { StorageDetailsComponent } from './storage-details/storage-details.component';
import { StorageEditComponent } from './storage-edit/storage-edit.component';
import { StorageListComponent } from './storage-list/storage-list.component';
import { StorageViewComponent } from './storage-view/storage-view.component';

const routes: Routes = [
  {path: 'products', component: StorageListComponent},
  {path: "products/:id", children: [
      { path: '', component: StorageDetailsComponent },
      { path: 'add', component: StorageAddComponent },
      { path: 'view', component: StorageViewComponent },
      { path: 'edit', component: StorageEditComponent }
    ]},
  { path: "", redirectTo: "products", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorageRoutingModule { }