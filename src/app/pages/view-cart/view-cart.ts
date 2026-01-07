import { Component } from '@angular/core';
import { BackButton } from "../../components/back-button/back-button";
import { ListCartItems } from "./list-cart-items/list-cart-items";
import { TeaseWhislist } from "./tease-whislist/tease-whislist";
import { SammarizeOrder } from "../../components/sammarize-order/sammarize-order";

@Component({
  selector: 'app-view-cart',
  imports: [BackButton, ListCartItems, TeaseWhislist, SammarizeOrder],
  templateUrl: './view-cart.html',
  styleUrl: './view-cart.scss',
})
export default class ViewCart {

}
