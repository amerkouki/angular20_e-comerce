import { Component, computed, inject, input } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { Product } from '../../models/products';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-toggle-wishlist-button',
  imports: [MatIcon],
  templateUrl: './toggle-wishlist-button.html',
  styleUrl: './toggle-wishlist-button.scss',
})
export class ToggleWishlistButton {
  
  product = input.required<Product>();
  store = inject(EcommerceStore);
  isInWhishlist = computed(()=> this.store.wishlistItems().find(p => p.id === this.product().id))

  toggleWishlist(product : Product){
    if(this.isInWhishlist()){
      this.store.removeFromWishlist(product);
    }
    else
    this.store.addTowishliste(product);
  }

}
