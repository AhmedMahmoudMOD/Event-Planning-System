import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-reset-pass-success',
  standalone: true,
  imports: [RouterModule, CommonModule,CardModule],
  templateUrl: './reset-pass-success.component.html',
  styleUrl: './reset-pass-success.component.css'
})
export class ResetPassSuccessComponent {

}
