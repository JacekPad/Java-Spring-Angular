import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StorageDetailsComponent } from './storage-details/storage-details.component';
import { StorageListComponent } from './storage-list/storage-list.component';

const routes: Routes = [
    {path: "products", component: StorageListComponent},
    {path: "", redirectTo: "products", pathMatch: "full"},
    {path: "products/:id", component: StorageDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorageRoutingModule { }