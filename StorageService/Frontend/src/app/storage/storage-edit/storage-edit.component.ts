import { Component } from '@angular/core';
import { PageMode } from 'src/app/shared/enums/storage-mode.enum';

@Component({
  selector: 'app-storage-edit',
  templateUrl: './storage-edit.component.html',
  styleUrls: ['./storage-edit.component.css']
})
export class StorageEditComponent {
  
  storageMode: PageMode = PageMode.EDIT;
}
