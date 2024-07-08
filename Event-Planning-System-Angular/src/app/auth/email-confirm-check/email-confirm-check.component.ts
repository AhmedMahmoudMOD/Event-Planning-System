import { Component , OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AccountService } from '../../shared/services/account.service';
import { ConfirmEmail } from '../../shared/models/confirmemail.model';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-email-confirm-check',
  standalone: true,
  imports: [CommonModule,CardModule,RouterModule],
  templateUrl: './email-confirm-check.component.html',
  styleUrl: './email-confirm-check.component.css'
})
export class EmailConfirmCheckComponent implements OnInit{
  isSuccessful = true;

  constructor(private accountService: AccountService, private router: Router,private ActivatedRoute:ActivatedRoute) { 
    // document.body.style.background = 'linear-gradient(to right, #f0f2f0, #000c40)';
  }

  ngOnInit(): void {
    if  (this.accountService.isLoggedIn){
      this.router.navigate(['/']);
    }else{
      this.ActivatedRoute.queryParams.subscribe(params => {
        const connfirmEmail : ConfirmEmail = {
          email: params['email'],
          token: params['token']
        };
        this.accountService.confirmEmail(connfirmEmail).subscribe(
          res => {
            // this.router.navigate(['auth/login']);
          },
          err => {
            // this.isSuccessful = false;
            console.log(err);
        }
      )});

    }
  }

}
