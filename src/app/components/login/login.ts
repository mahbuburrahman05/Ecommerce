// login.ts

import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  api = inject(Api);
  router = inject(Router);
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
onLogin() {

  const email = this.loginForm.value.email;

  const password = this.loginForm.value.password;

  if (!email || !password) {
    alert('Please enter both email and password');
    return;
  }

  console.log(email, password);
  this.api.loginUser(email).subscribe({
    next: (users: any[]) => {
      const user = users && users.length > 0 ? users[0] : null;
      if (user && user.password === password) {
        alert('Login successful');
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/admin']);
      } else {
        alert('Invalid email or password');
      }
    },
    error: (err) => {
      console.log(err);
    }
  });

}
}