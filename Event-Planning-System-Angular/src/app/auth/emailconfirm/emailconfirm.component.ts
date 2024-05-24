import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-emailconfirm',
  standalone: true,
  imports: [CardModule,ButtonModule],
  templateUrl: './emailconfirm.component.html',
  styleUrl: './emailconfirm.component.css'
})
export class EmailconfirmComponent {

  constructor() { 
    document.body.style.background = 'linear-gradient(to right, #f0f2f0, #000c40)';
  }

}
