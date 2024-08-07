import { Component, OnInit, Output,EventEmitter } from '@angular/core';
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
  id = +this.accountService.extractUserID();

  @Output() profileUpdated: EventEmitter<void> = new EventEmitter();

  constructor(
    private profileService: ProfileService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  getProfile() {
    this.profileService
      .getProfile(this.id)
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


  ngOnInit() {
    this.getProfile();
  }

  showEditModal() {
    this.displayEditModal = true;
  }

  hideEditModal() {
    this.displayEditModal = false;
  }

  updateProfile(profile: Profile) {
    this.profileService.updateProfile(this.id, profile).subscribe(
      (data) => {
        console.log('Profile update response:', data);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Profile Updated Successfully',
        });

        setTimeout(() => {
          this.hideEditModal();
        }, 1000);

        // get updated profile
        this.profileUpdated.emit()

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
