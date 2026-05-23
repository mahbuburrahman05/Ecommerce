import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
protected readonly title = signal('Ecommerce');
isLoggedIn: boolean = false;
constructor(private router: Router) {}
ngDoCheck(){
  this.checkLogin();
}
checkLogin(){
  const user = localStorage.getItem('user');
  this.isLoggedIn = !!user;
}
logout(){
  localStorage.removeItem('user');
  this.router.navigate(['/login']);
}
mobileMenu = false;

toggleMenu() {

  this.mobileMenu = !this.mobileMenu;

}

}
