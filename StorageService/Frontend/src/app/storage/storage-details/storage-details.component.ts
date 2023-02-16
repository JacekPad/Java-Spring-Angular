import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product-model';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-storage-details',
  templateUrl: './storage-details.component.html',
  styleUrls: ['./storage-details.component.css']
})
export class StorageDetailsComponent implements OnInit {

  constructor(private storageService: StorageService, private activatedRoute: ActivatedRoute) { };
  product?: Product
  selectedId: number = -1;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      this.selectedId = Number(param.get('id'));
      if (this.selectedId > 0 ) {
        this.storageService.getProduct(this.selectedId).subscribe(prodcut => {
          this.product = prodcut;
        });
      };
    });
  }
}



