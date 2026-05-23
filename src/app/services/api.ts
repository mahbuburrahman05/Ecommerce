import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class Api {

    useForm : FormGroup = new FormGroup({
      id : new FormControl(0),
      title : new FormControl(''),
      price : new FormControl(''),
      description : new FormControl(''),
      category : new FormControl(''),
      image : new FormControl('')
    });

  http = inject(HttpClient);
  getProducts() {
    return this.http.get('http://localhost:3000/products');
  }
  postProducts( data: any) {
    return this.http.post('http://localhost:3000/products', data);
  }
updateProduct(id: number, data: any) {
  return this.http.put(`http://localhost:3000/products/${id}`, data);
}
deleteProduct(id: number) {
  return this.http.delete(
    `http://localhost:3000/products/${id}`
  );
}
loginUser(email: string) {
  return this.http.get<any[]>(
    `http://localhost:3000/users?email=${encodeURIComponent(email)}`
  );
  
}
addToCart(product: any) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Product added to cart!');
}
getCartItems() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}
}
