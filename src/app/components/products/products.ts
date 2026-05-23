import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from '../../services/api';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-products',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  allList = inject(Api);
  Products: Observable<any>;
 addToCart(product: any) {
    this.allList.addToCart(product);
  }
  constructor(){
    this.Products = this.allList.getProducts();
    
  }
}
