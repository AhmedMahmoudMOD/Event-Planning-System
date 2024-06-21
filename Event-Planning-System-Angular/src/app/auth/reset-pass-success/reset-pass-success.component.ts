import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-reset-pass-success',
  standalone: true,
  imports: [RouterModule, CommonModule,CardModule,DialogModule],
  templateUrl: './reset-pass-success.component.html',
  styleUrl: './reset-pass-success.component.css'
})
export class ResetPassSuccessComponent {
  
  constructor(public modalService: ModalService) { }
}
