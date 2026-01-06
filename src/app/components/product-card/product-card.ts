import { Component, computed, inject, input, output } from '@angular/core';
import { Product } from '../../models/products';
import { MatAnchor, MatButton,  } from "@angular/material/button";
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-product-card',
  imports: [MatAnchor, MatButton, MatIcon, ],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {

  product = input.required<Product>();

  addToCartClicked =output<Product>();

}
