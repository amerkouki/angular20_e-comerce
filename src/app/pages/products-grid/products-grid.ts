import { Component, computed, inject, input, signal } from '@angular/core';
import { Product } from '../../models/products';
import { ProductCard } from "../../components/product-card/product-card";
import { MatSidenavContainer,MatSidenavModule,MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { EcommerceStore } from '../../ecommerce-store';
import { ToggleWishlistButton } from "../../components/toggle-wishlist-button/toggle-wishlist-button";

@Component({
  selector: 'app-products-grid',
  imports: [ProductCard, MatSidenavContainer,
    MatSidenavModule, MatSidenav,
    MatNavList, MatListItem,
    MatListItemTitle, RouterLink,
    TitleCasePipe, ToggleWishlistButton],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})
export  default class ProductsGrid {
  category = input<string>('all');
  
  store = inject(EcommerceStore);


  addToCart($event:any){

  }

  categories = computed<string[]>(() => [
    'all',
    ...new Set(this.store.products()?.map(p => p.category) ?? [])
  ]);
 
  constructor(){
    this.store.setCategory(this.category);
  }
}
