import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../shared/services/profile.service';
import { Profile } from '../shared/models/profile';
import { AccountService } from '../shared/services/account.service';
import { finalize } from 'rxjs';
import { ProfileUpdateComponent } from "../profile-update/profile-update.component";
import { Event } from '../shared/models/event';


@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [CommonModule, RouterModule, RouterLink, FormsModule, ProfileUpdateComponent]
})
export class ProfileComponent implements OnInit{
  title = 'Profile';
  profile: Profile = {} as Profile;
  defaultImage = "assets/images/default_Image.jpg";

  // profileId!: number;
  profileId = + this.accountService.extractUserID();

  eventList: Event[] = [];
  // count the number of events in eventList array
  eventCount = this.eventList.length;

  isLoading : boolean = false;


  constructor(private profileService: ProfileService, private accountService:AccountService, private route: ActivatedRoute) { }
    //get profile by user id
  ngOnInit(): void {
    this.profileId = + this.accountService.extractUserID();
    this.isLoading = true;
    this.getProfile();
  }

  getProfile(){
    this.profileService.getProfile(this.profileId).pipe(finalize(()=> this.isLoading =false)).subscribe({
      next: (d:Profile) => {
        this.profile = d as any;
      }
    });
  }
}



