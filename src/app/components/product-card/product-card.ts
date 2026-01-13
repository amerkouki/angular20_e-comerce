import { Component, computed, inject, input, output } from '@angular/core';
import { Product } from '../../models/products';
import { MatAnchor, MatButton,  } from "@angular/material/button";
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product-card',
  imports: [MatAnchor, MatButton, MatIcon, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {

  product = input.required<Product>();

  addToCartClicked =output<Product>();
  store = inject(EcommerceStore);

}
