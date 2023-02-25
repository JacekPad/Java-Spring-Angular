import { Component } from '@angular/core';
import { PageMode } from 'src/app/shared/enums/storage-mode.enum';

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.css']
})
export class SupplierEditComponent {
    supplierMode: PageMode = PageMode.EDIT;
}
