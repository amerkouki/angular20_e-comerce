import { Component, computed, inject } from '@angular/core';
import { ViewPanel } from "../../directives/view-panel";
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-sammarize-order',
  imports: [ViewPanel],
  templateUrl: './sammarize-order.html',
  styleUrl: './sammarize-order.scss',
})
export class SammarizeOrder {
  store = inject(EcommerceStore);
  subtotal = computed(()=> Math.round(this.store.cartItems().reduce((acc,item)=> acc + (item.product.price * item.quantity),0)));
  tax = computed(()=> Math.round(0.05 * this.subtotal()));
  total = computed(()=> Math.round(this.subtotal() - this.tax()))

}
