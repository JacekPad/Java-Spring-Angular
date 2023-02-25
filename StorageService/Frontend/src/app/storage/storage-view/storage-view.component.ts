import { Component } from '@angular/core';
import { PageMode } from 'src/app/shared/enums/storage-mode.enum';

@Component({
  selector: 'app-storage-view',
  templateUrl: './storage-view.component.html',
  styleUrls: ['./storage-view.component.css']
})
export class StorageViewComponent {
  storageMode: PageMode = PageMode.VIEW;
}
