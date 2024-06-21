import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../shared/services/profile.service';
import { AccountService } from '../shared/services/account.service';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '../shared/models/profile';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [], // Include necessary Angular modules here if needed
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Corrected styleUrls
})
export class NavbarComponent implements OnInit {

  userId!: number;
  profile: Profile | any = {};


  constructor(private profileService: ProfileService, private accountService: AccountService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = +this.accountService.extractUserID();
  }
}