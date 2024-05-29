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
import { ChipModule } from 'primeng/chip';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { SafePipe } from './safe.pipe';




@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [FormsModule,GalleriaModule ,SafePipe,ImageModule,ChipModule , CardModule, CheckboxModule,ButtonModule, TabViewModule, SelectButtonModule, RouterLink, ScrollPanelModule , ScrollerModule, TabViewModule, ButtonModule, TagModule ],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})



export class EventDetailsComponent implements OnInit, OnChanges {

  // declration of variables
  checked: boolean = false;
  seeMoreLink = document.getElementById("seeMoreLink") as HTMLAnchorElement;
  text = document.getElementById("text") as HTMLPreElement;

// constructors

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

  //end of constructors

  reset() {
} 

  stateOptions: any[] = [{ label: 'About', value: 'About' }, { label: 'Discussion', value: 'Discussion' }];

  value: string = 'off';


  //carsol related code
  products = [
      { name: 'Product 1', image: '../../../assets/images/software-developer-6521720_640.jpg' },
      { name: 'Product 2', image: '../../../assets/images/software-developer-6521720_640.jpg' },
      { name: 'Product 3', image: '../../../assets/images/software-developer-6521720_640.jpg' },
  ]


  

getSeverity(status: string):any {
  switch (status) {
      case 'INSTOCK':
          return 'success';
      case 'LOWSTOCK':
          return 'warning';
      case 'OUTOFSTOCK':
          return 'danger';
  }
}

//end of carsol related code

images: any[] | undefined = [
  {
    itemImageSrc: '../../../assets/images/software-developer-6521720_640.jpg',
    alt: 'Description for Image 1',
    title: 'Title 1'
},
{
  itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg',
  alt: 'Description for Image 1',
  title: 'Title 1'
},
{
  itemImageSrc: '../../../assets/images/software-developer-6521720_640.jpg',
  alt: 'Description for Image 1',
  title: 'Title 1'
},
]

responsiveOptions: any[] = [
  {
      breakpoint: '1024px',
      numVisible: 5
  },
  {
      breakpoint: '768px',
      numVisible: 3
  },
  {
      breakpoint: '560px',
      numVisible: 1
  }
];


positionMap = {
  street: "Brookline",
  num: "123",
  city: "NewYork"
};
mapsURL : string | null = `https://maps.google.com/maps?q=${this.positionMap.street}%20${this.positionMap.num}%20%${this.positionMap.city}&t=&z=20&ie=UTF8&iwloc=&output=embed`;



log() :any{
  console.log("hello world");
}


//end of class
}
