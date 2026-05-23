import { Component, inject } from '@angular/core';
import { Api } from '../../services/api';
import { RouterLink } from "@angular/router";
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  http = inject(Api);
  cartItems: any[] = [];
  constructor() {
    this.loadCartItems();
  }
  loadCartItems() {
    this.cartItems = this.http.getCartItems();
  }
  removeFromCart(product: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter((item: any) => item.id !== product.id);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.loadCartItems();
  }
}
