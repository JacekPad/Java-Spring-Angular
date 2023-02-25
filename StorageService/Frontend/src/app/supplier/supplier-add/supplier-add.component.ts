import { Component } from '@angular/core';
import { PageMode } from 'src/app/shared/enums/storage-mode.enum';

@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.css']
})
export class SupplierAddComponent {
    supplierMode: PageMode = PageMode.ADD;
}
