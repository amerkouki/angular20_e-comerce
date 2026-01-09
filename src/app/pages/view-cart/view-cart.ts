import { Component, inject } from '@angular/core';
import { BackButton } from "../../components/back-button/back-button";
import { ListCartItems } from "./list-cart-items/list-cart-items";
import { TeaseWhislist } from "./tease-whislist/tease-whislist";
import { SammarizeOrder } from "../../components/sammarize-order/sammarize-order";
import { MatAnchor } from "@angular/material/button";
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-view-cart',
  imports: [BackButton, ListCartItems, TeaseWhislist, SammarizeOrder, MatAnchor],
  templateUrl: './view-cart.html',
  styleUrl: './view-cart.scss',
})
export default class ViewCart {
store = inject(EcommerceStore);
}
