import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RouterLink } from '@angular/router';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import {  ScrollerModule } from 'primeng/scroller';
import { TagModule } from 'primeng/tag';
import { CheckboxModule } from 'primeng/checkbox';




@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [FormsModule, CardModule, CheckboxModule,ButtonModule, TabViewModule, SelectButtonModule, RouterLink, ScrollPanelModule , ScrollerModule, TabViewModule, ButtonModule, TagModule ],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})



export class EventDetailsComponent implements OnInit, OnChanges {
  checked: boolean = false;
  seeMoreLink = document.getElementById("seeMoreLink") as HTMLAnchorElement;
  text = document.getElementById("text") as HTMLPreElement;

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }
  reset() {
} 

  stateOptions: any[] = [{ label: 'About', value: 'About' }, { label: 'Discussion', value: 'Discussion' }];

  value: string = 'off';


  products = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
  },
  ]

  getSeverity(product: any) {
    switch (product.inventoryStatus) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
};







}
