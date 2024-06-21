import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../shared/services/profile.service';
import { AccountService } from '../shared/services/account.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})


export class NavbarComponent implements OnInit{
  constructor(private profileService: ProfileService,private accountService:AccountService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.accountService.extractUserID();
    
  }

}
