import { Component } from '@angular/core';
import { StorageMode } from '../enums/storage-mode.enum';

@Component({
  selector: 'app-storage-edit',
  templateUrl: './storage-edit.component.html',
  styleUrls: ['./storage-edit.component.css']
})
export class StorageEditComponent {
  
  storageMode: StorageMode = StorageMode.EDIT;
}
