import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../shared/services/profile.service';
import { Profile } from '../../shared/models/profile';
import { AccountService } from '../../shared/services/account.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent {

  title = 'Update Profile';
  profile: Profile | any = {};
  defaultImage = 'assets/images/default_Image.jpg';

  constructor(private profileService: ProfileService, private accountService: AccountService, private route: ActivatedRoute) {}

  // update profile
    updateProfile(): void {
      this.profileService.updateProfile(this.profile).subscribe({
        next: (d) => {
          this.profile = d;
        },
      });
    }

}
