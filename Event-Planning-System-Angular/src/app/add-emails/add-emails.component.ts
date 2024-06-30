import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '../shared/services/event.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChipsModule } from 'primeng/chips';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-emails',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ChipsModule,
    MessagesModule,
    MessageModule,
    ProgressSpinnerModule,
    DialogModule,
    ButtonModule,
  ],
  templateUrl: './add-emails.component.html',
  styleUrls: ['./add-emails.component.css'],
})
export class AddEmailsComponent implements OnDestroy, OnInit {
  emails: string[] = [];
  invalidEmails: string[] = [];
  invitedEmails: string[] = [];
  DuplicateEmails: string[] = [];
  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading: boolean = false;
  eventId: number = 0;
  sub: Subscription | null = null;
  EmailSub: Subscription | null = null;
  displayModal: boolean = false;

  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.eventId = params['id'];
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.EmailSub?.unsubscribe();
  }

  checkEmail(email: string): boolean {
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailRegex.test(email)) return true;
    return false;
  }

  openModal() {
    this.displayModal = true;
  }

  closeModal() {
    this.displayModal = false;
    this.emails = [];
    this.errorMessage = null;
    this.successMessage = null;  
  }

  submitEmails() {
    this.errorMessage = null;
    this.successMessage = null;

    this.invalidEmails = this.emails.filter((email) => !this.checkEmail(email));

    this.loading = true;

    this.EmailSub = this.eventService
      .addAttendance(this.eventId, this.emails.filter(this.checkEmail))
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.invitedEmails = response.successfulEmails;
            this.DuplicateEmails = response.duplicateEmails;
            this.successMessage = `
            <div>Emails submitted successfully.<br>
              <br/>Invited: ${response.successfulEmails.join(', ')}.
              <br/><div class="alert alert-danger">Invalid: ${this.invalidEmails.join(
                ', '
              )}.</div>
              <br/><div class="alert alert-info">Duplicates: ${response.duplicateEmails.join(
                ', '
              )}.</div>
            </div>`;            
          } else {
            this.invitedEmails = response.successfulEmails;
            this.DuplicateEmails = response.duplicateEmails;
            this.errorMessage =
              response.message || 'An error occurred while adding emails';
            if (this.invalidEmails) {
              this.errorMessage += ` Invalid: ${this.invalidEmails.join(
                ', '
              )}.`;
            }
          }
          this.loading = false;
        },
        error: (error) => {
          console.log(error);
          this.errorMessage =
            error.error?.message || 'An error occurred while adding emails';
          this.invitedEmails = error.error?.successfulEmails;
          this.DuplicateEmails = error.error?.duplicateEmails;
          this.invalidEmails?.length > 0
            ? (this.errorMessage += ` Invalid: ${this.invalidEmails.join(
                ', '
              )}.`)
            : '';
          error.error?.duplicateEmails.length > 0
            ? (this.errorMessage += `Duplicate: ${error.error.duplicateEmails.join(
                ', '
              )}.`)
            : '';
          this.loading = false;
        },
      });
  }
}
