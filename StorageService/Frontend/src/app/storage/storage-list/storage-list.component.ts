import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product-model';
import { StorageService } from '../storage.service';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-storage-list',
  templateUrl: './storage-list.component.html',
  styleUrls: ['./storage-list.component.css']
})
export class StorageListComponent implements OnInit, AfterViewInit{
  products: Observable<Product[]> | undefined;
  dataToDisplay = new MatTableDataSource();
  displayedColumns = ['id','name','type','quantity'];

  @ViewChild(MatPaginator)  paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  
  constructor(private storageService: StorageService) { }
  ngAfterViewInit(): void {
    this.dataToDisplay.paginator = this.paginator;
    this.dataToDisplay.sort = this.matSort
  }
  
  ngOnInit(): void {
    this.storageService.getProducts().subscribe(resp => {
      this.dataToDisplay.data = resp
    })
  }

  test(productId: number) {
    console.log(productId);
    
    
  }

}
