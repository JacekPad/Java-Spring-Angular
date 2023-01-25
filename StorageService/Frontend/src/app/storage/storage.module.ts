import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageListComponent } from './storage-list/storage-list.component';
import { StorageDetailsComponent } from './storage-details/storage-details.component';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    StorageListComponent,
    StorageDetailsComponent
  ],
  imports: [
    CommonModule,
    MatTableModule
  ]
})
export class StorageModule { }
