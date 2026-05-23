import { Component, inject } from '@angular/core';
import { Products } from '../products/products';
import { Api } from '../../services/api';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  useForm : FormGroup = new FormGroup({
    id : new FormControl(0,) ,
    title : new FormControl(''),
    price : new FormControl(''),
    description : new FormControl(''),
    category : new FormControl(''),
    image : new FormControl('')
  });
  isEditMode: boolean = false;
 allList = inject(Api);
  Product$: Observable<any>;
  loadProducts() {
    this.Product$ = this.allList.getProducts();
  }

  constructor(){
    this.Product$ = this.allList.getProducts();
    this.loadProducts();
  }
onSaveUser() {
  const formValue = this.useForm.value;
  this.allList.postProducts(formValue).subscribe({
    next: (res) => {
      alert('Product Added Successfully');
      console.log(res);
        this.loadProducts();
      this.useForm.reset();
    },
    error: (err) => {
      console.error(err);
    }
  });
  }
  onEdit(item: any){
      this.isEditMode = true;
    this.useForm.patchValue({
      id: item.id,
      title: item.title,
      price: item.price,
      category: item.category,
      image: item.image
    });
  }
  onClear(){
    this.useForm.reset();
      this.isEditMode = false;
  }
onUpdateUser() {

  const formValue = this.useForm.value;

  this.allList.updateProduct(formValue.id, formValue).subscribe({
    next: () => {
      alert('Updated Successfully');
      this.loadProducts();
      this.useForm.reset();
      this.isEditMode = false;
    },
    error: (err) => {
      console.log(err);
    }
  });
}
deleteItem(id: number) {
  this.allList.deleteProduct(id).subscribe({
    next: (res) => {
      this.useForm.reset();
        this.loadProducts();
      console.log(res);
      alert('Product Deleted');
    },
    error: (err) => {
      console.log(err);
    }
  });
}
}

