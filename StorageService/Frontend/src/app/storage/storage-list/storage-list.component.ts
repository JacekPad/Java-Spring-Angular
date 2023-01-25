import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product-model';
import { StorageService } from '../storage.service';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TestModel } from '../model/test-table-model';

@Component({
  selector: 'app-storage-list',
  templateUrl: './storage-list.component.html',
  styleUrls: ['./storage-list.component.css']
})
export class StorageListComponent implements OnInit{
  products: Observable<Product[]> | undefined;
  dataToDisplay = new MatTableDataSource();
  displayedColumns = ['id','name','type','quantity'];

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.storageService.getProducts().subscribe(resp => {
      this.dataToDisplay.data = resp
    })
  }

}
