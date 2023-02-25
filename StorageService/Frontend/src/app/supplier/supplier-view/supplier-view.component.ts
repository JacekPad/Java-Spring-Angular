import { Component } from '@angular/core';
import { PageMode } from 'src/app/shared/enums/storage-mode.enum';

@Component({
  selector: 'app-supplier-view',
  templateUrl: './supplier-view.component.html',
  styleUrls: ['./supplier-view.component.css']
})
export class SupplierViewComponent {
    supplierMode: PageMode = PageMode.VIEW;
}
