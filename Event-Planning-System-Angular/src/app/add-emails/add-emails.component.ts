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

  checkEmails(emailsToCheck: string[]): boolean {
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    for (let email of emailsToCheck) {
      if (!emailRegex.test(email)) {
        return false;
      }
    }
    return true;
  }

  openModal() {
    this.displayModal = true;
  }

  closeModal() {
    this.displayModal = false;
  }

  submitEmails() {
    this.errorMessage = null;
    this.successMessage = null;

    if (!this.checkEmails(this.emails) || this.emails.length === 0) {
      this.errorMessage = 'Invalid email address';
      return;
    }

    this.loading = true;

    this.EmailSub = this.eventService
      .addAttendance(this.eventId, this.emails)
      .subscribe({
        next: () => {
          this.successMessage = 'Emails submitted successfully';
          this.loading = false;
        },
        error: (error) => {
          console.log(error);
          this.errorMessage =
            error.error || 'An error occurred while adding emails';
          this.loading = false;
          console.log(error);
        },
      });
  }
}
