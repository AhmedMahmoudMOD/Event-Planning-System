import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../shared/services/profile.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  title = 'Profile';
  userId: number;
  profile: any;


  constructor(private profileService: ProfileService, private route: ActivatedRoute) { }
    //get profile by user id
  getProfile(userId: number) {
    return this.profileService.getProfile(userId);

  }
}
