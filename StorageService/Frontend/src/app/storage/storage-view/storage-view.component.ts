import { Component } from '@angular/core';
import { StorageMode } from '../enums/storage-mode.enum';

@Component({
  selector: 'app-storage-view',
  templateUrl: './storage-view.component.html',
  styleUrls: ['./storage-view.component.css']
})
export class StorageViewComponent {
  storageMode: StorageMode = StorageMode.VIEW;
}
