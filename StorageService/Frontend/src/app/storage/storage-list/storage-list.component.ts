import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product-model';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-storage-list',
  templateUrl: './storage-list.component.html',
  styleUrls: ['./storage-list.component.css']
})
export class StorageListComponent implements OnInit{
  products: Observable<Product[]> | undefined;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
   this.products = this.storageService.getProducts();
  }

}
