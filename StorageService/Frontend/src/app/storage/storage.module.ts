import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageListComponent } from './storage-list/storage-list.component';
import { StorageDetailsComponent } from './storage-details/storage-details.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    StorageListComponent,
    StorageDetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule

  ]
})
export class StorageModule { }
