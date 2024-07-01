import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../shared/services/profile.service';
import { AccountService } from '../shared/services/account.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Profile } from '../shared/models/profile';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-profile-update',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    CommonModule,
    RouterModule,
    RouterLink,
    FormsModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css'],
})
export class ProfileUpdateComponent implements OnInit {
  profile: Profile | any = {};
  displayEditModal = false;

  constructor(
    private profileService: ProfileService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  getProfile() {

  }

  ngOnInit() {
    const id = +this.accountService.extractUserID();
    this.profileService
      .getProfile(id)
      .pipe(
        catchError((err) => {
          console.error('Error fetching profile:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load profile',
          });
          return of({});
        })
      )
      .subscribe({
        next: (data) => {
          this.profile = data;
        },
        error: (err) => {
          console.error('Error fetching profile:', err);
        },
      });
  }

  showEditModal() {
    this.displayEditModal = true;
  }

  hideEditModal() {
    this.displayEditModal = false;
  }

  updateProfile(profile: Profile) {
    const id = +this.accountService.extractUserID();
    this.profileService.updateProfile(id, profile).subscribe(
      (data) => {
        console.log('Profile update response:', data);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Profile Updated Successfully',
        });
        // get updated profile
        // this.getProfile();

        setTimeout(() => {
          this.hideEditModal();
        }, 1000);
      },
      (error) => {
        console.error('Error updating profile:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Profile Update Failed',
        });
      }
    );
  }
}
