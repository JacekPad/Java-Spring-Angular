import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageListComponent } from './storage-list/storage-list.component';
import { StorageDetailsComponent } from './storage-details/storage-details.component';



@NgModule({
  declarations: [
    StorageListComponent,
    StorageDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StorageModule { }
