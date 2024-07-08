import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { set } from 'date-fns';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-emailconfirm',
  standalone: true,
  imports: [CardModule,ButtonModule],
  templateUrl: './emailconfirm.component.html',
  styleUrl: './emailconfirm.component.css'
})
export class EmailconfirmComponent implements OnInit {

  constructor(private router:Router) { 
    // document.body.style.background = 'linear-gradient(to right, #f0f2f0, #000c40)';
  }

  ngOnInit(): void {
   setTimeout(() => {
    this.router.navigate(['auth/login']);
   }, 5000);
  }

}
