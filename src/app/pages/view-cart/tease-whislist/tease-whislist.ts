import { Component, inject } from '@angular/core';
import { ViewPanel } from "../../../directives/view-panel";
import { MatIcon } from "@angular/material/icon";
import { EcommerceStore } from '../../../ecommerce-store';
import { RouterLink } from "@angular/router";
import { MatBadge } from "@angular/material/badge";
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-tease-whislist',
  imports: [ViewPanel, MatIcon, RouterLink, MatBadge, MatButton],
  templateUrl: './tease-whislist.html',
  styleUrl: './tease-whislist.scss',
})
export class TeaseWhislist {

  store = inject(EcommerceStore);
}
