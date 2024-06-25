import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../shared/services/profile.service';
import { Profile } from '../../shared/models/profile';
import { AccountService } from '../../shared/services/account.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  title = 'Profile';
  profile: Profile | any = {};
  defaultImage = 'assets/images/default_Image.jpg';

  eventList: Event[] = [];
  // count the number of events in eventList array
  eventCount = this.eventList.length;

  isLoading: boolean = false;

  constructor(
    private profileService: ProfileService,
    private accountService: AccountService,
    private route: ActivatedRoute
  ) {}
  //get profile by user id
  ngOnInit(): void {
    const id = +this.accountService.extractUserID();
    this.isLoading = true;
    this.profileService
      .getProfile(id)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (d) => {
          this.profile = d;
        },
      });
  }

  // update profile
  updateProfile(): void {
    this.profileService.updateProfile(this.profile).subscribe({
      next: (d) => {
        this.profile = d;
      },
    });
  }

}
