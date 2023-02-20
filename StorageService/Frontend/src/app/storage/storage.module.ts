import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageListComponent } from './storage-list/storage-list.component';
import { StorageDetailsComponent } from './storage-details/storage-details.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StorageViewComponent } from './storage-view/storage-view.component';
import { StorageAddComponent } from './storage-add/storage-add.component';
import { StorageEditComponent } from './storage-edit/storage-edit.component';
@NgModule({
  declarations: [
    StorageListComponent,
    StorageDetailsComponent,
    StorageViewComponent,
    StorageAddComponent,
    StorageEditComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule

  ]
})
export class StorageModule { }
