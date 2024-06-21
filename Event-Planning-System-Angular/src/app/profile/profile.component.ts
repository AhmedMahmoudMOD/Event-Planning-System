import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../shared/services/profile.service';
import { Profile } from '../shared/models/profile';
import { AccountService } from '../shared/services/account.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  title = 'Profile';
  profile: Profile | any = {};
  defaultImage = "/src/assets/images/software-developer-6521720_640.jpg";

  constructor(private profileService: ProfileService, private accountService: AccountService, private route: ActivatedRoute) { }
    //get profile by user id
  ngOnInit(): void {
    const id = + this.accountService.extractUserID();
    this.profileService.getProfile(id).subscribe({
      next: d => {
        this.profile = d;
      }
    });
  }
}
