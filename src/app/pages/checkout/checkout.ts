import { Component, inject } from '@angular/core';
import { BackButton } from "../../components/back-button/back-button";
import { ShippingForm } from "../shipping-form/shipping-form";
import { PaymentForm } from "../payment-form/payment-form";
import { SammarizeOrder } from "../../components/sammarize-order/sammarize-order";
import { EcommerceStore } from '../../ecommerce-store';
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-checkout',
  imports: [BackButton, ShippingForm, PaymentForm, SammarizeOrder, MatAnchor],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export default class Checkout {
store = inject(EcommerceStore);
}
