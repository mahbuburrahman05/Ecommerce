import { Routes } from '@angular/router';
import { Frontpage } from './components/frontpage/frontpage';
import { Products } from './components/products/products';
import { Admin } from './components/admin/admin';
import { Signup } from './components/signup/signup';
import { pattern } from '@angular/forms/signals';
import { Component } from '@angular/core';
import { Login } from './components/login/login';
import { guardsGuard } from './Auth/guards-guard';
import { Cart } from './components/cart/cart';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: Frontpage
    },
    {
        path: 'products',
        component: Products
    },
    {
        path: 'admin',
        component: Admin,
        canActivate: [guardsGuard],
    },
    {
        path: 'signup',
        component: Signup
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'cart',
        component: Cart,
    }
];
