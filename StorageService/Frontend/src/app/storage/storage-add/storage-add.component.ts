import { Component } from '@angular/core';
import { StorageMode } from '../enums/storage-mode.enum';

@Component({
  selector: 'app-storage-add',
  templateUrl: './storage-add.component.html',
  styleUrls: ['./storage-add.component.css']
})
export class StorageAddComponent {
  storageMode: StorageMode = StorageMode.ADD;
}
