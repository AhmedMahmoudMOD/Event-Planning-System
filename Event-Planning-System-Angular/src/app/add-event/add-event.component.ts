import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { EventService } from '../shared/services/event.service';
import { HttpClient } from '@angular/common/http';
import { eventTypes } from '../shared/models/eventTypes';
import { DropdownModule } from 'primeng/dropdown';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    CommonModule,
    RouterModule,
    CalendarModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    FloatLabelModule,
    DropdownModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
  ],
  providers: [DatePipe],
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  display: boolean = false;
  addEventForm: FormGroup;
  submitted: boolean = false;
  minDate: Date = new Date();
  errorMessage: string = '';
  loading: boolean = false;
  Types: eventTypes[] = [
    { id: 0, name: 'Wedding' },
    { id: 1, name: 'Birthday' },
    { id: 2, name: 'Corporate' },
    { id: 3, name: 'Social' },
    { id: 4, name: 'Other' }
  ];

  @Output() newEventAdded: EventEmitter<void> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private httpclient: HttpClient,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.addEventForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      location: ['', [Validators.required, Validators.minLength(3)]],
      attendanceNumber: ['', [Validators.required, Validators.min(0)]],
      googleMapsLocation: ['', Validators.minLength(3)],
      budget: ['', Validators.required],
      eventType: ['', Validators.required],
      eventDate: ['', Validators.required],
      endDate: ['', [Validators.required, this.checkDate.bind(this)]],
      isPrivate: [true]
    });
  }

  ngOnInit(): void {}

  // Custom validator to check if end date is at least one hour after start date
  checkDate(control: AbstractControl): ValidationErrors | null {
    const eventDate = this.addEventForm?.get('eventDate')?.value;
    const endDate = control.value;
    if (eventDate && endDate) {
      const eventDateTime = new Date(eventDate).getTime();
      const endDateTime = new Date(endDate).getTime();
      const oneHourInMillis = 60 * 60 * 1000;

      if (endDateTime <= eventDateTime || (endDateTime - eventDateTime) < oneHourInMillis) {
        return { invalidDate: true };
      }
    }
    return null;
  }

  // Prevent change value while scrolling
  onScroll(event: any) {
    if (event.target === document.activeElement) {
      event.preventDefault();
    }
  }

  showAddModal() {
    this.display = true;
  }

  hideAddModal() {
    this.display = false;
  }

  addEvent() {
    this.submitted = true;

    // Check if the form is valid before proceeding
    if (this.addEventForm.invalid) {
      return;
    }

    this.loading = true;

    // Ensure eventType is a number
    const event = this.addEventForm.value;
    event.eventType = Number(event.eventType);
    
    // Ensure isPrivate is a boolean
    event.isPrivate = event.isPrivate === 'true';

    // Wrap the event object in the newEventDTO object if needed
    const requestBody = { newEventDTO: event };

    console.log(requestBody);

    this.eventService.addEvent(requestBody.newEventDTO).pipe(
      catchError(error => {
        console.error('Error adding event:', error);
        if (error.status === 400 && error.error) {
          console.error('Validation errors:', error.error.errors);
        }
        this.errorMessage = 'An error occurred while adding the event. Please try again.';
        return of(null);
      })
    ).subscribe({
      next: (response: any) => {
        this.hideAddModal();
        this.newEventAdded.emit()
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
