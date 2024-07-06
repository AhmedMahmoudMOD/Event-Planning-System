import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '../../shared/services/event.service';
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
  selector: 'app-upload-emails-from-excel',
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
  templateUrl: './upload-emails-from-excel.component.html',
  styleUrl: './upload-emails-from-excel.component.css',
})
export class UploadEmailsFromExcelComponent implements OnInit, OnDestroy {
  invalidEmails: string[] = [];
  invitedEmails: string[] = [];
  duplicateEmails: string[] = [];
  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading: boolean = false;
  eventId: number = 0;
  sub: Subscription | null = null;
  fileSub: Subscription | null = null;
  displayModal: boolean = false;
  selectedFile: File | null = null;

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
    this.fileSub?.unsubscribe();
  }

  openModal() {
    this.displayModal = true;
  }

  closeModal() {
    this.displayModal = false;
    this.invalidEmails = [];
    this.invitedEmails = [];
    this.duplicateEmails = [];
    this.errorMessage = null;
    this.successMessage = null;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    this.errorMessage = null;
    this.successMessage = null;
    this.loading = true;

    if (this.selectedFile) {
      this.fileSub = this.eventService
        .uploadEmailsSheet(this.eventId, this.selectedFile)
        .subscribe({
          next: (response) => {
            console.log('response', response);
            this.invitedEmails = response.successfulEmails || [];
            this.invalidEmails = response.invalidEmails || [];
            this.duplicateEmails = response.duplicateEmails || [];
            this.successMessage = 'Emails uploaded successfully.';
            this.loading = false;
          },
          error: (error) => {
            console.log('response', error);
            this.errorMessage =
              error.error?.message ||
              'An error occurred while uploading the file.';
            this.loading = false;
          },
        });
    } else {
      this.errorMessage = 'No file selected.';
      this.loading = false;
    }
  }
}
