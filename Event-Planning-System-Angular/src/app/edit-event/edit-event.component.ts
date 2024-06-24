import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../shared/services/event.service';
import { ActivatedRoute } from '@angular/router';
import { EditEvent } from '../shared/models/EditEvent';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    CommonModule,
    ReactiveFormsModule,
    CalendarModule
  ],
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']  // Note the plural form here
})
export class EditEventComponent implements OnInit {
  oldEvent!: EditEvent;
  editForm: FormGroup;
  display: boolean = false;
  eventId: number = 0;
  MinDate: Date = new Date();
  initialStartDate: Date = new Date();
  initialEndDate: Date = new Date();
  submitted: boolean = false;
  errorMessage: string = '';

  constructor(
    private eventService: EventService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      location: ['', [Validators.required, Validators.minLength(3)]],
      attendanceNumber: [0, [Validators.required, Validators.min(0)]],
      googleMapsLocation: ['', Validators.minLength(3)],
      eventDate: [null, Validators.required],
      budget: [0, Validators.required],
      endDate: [null, [Validators.required, this.checkDate.bind(this)]]
    });
  }

  ngOnInit(): void {
    const id = (this.route.snapshot.paramMap.get('id'));
    this.eventId = id ? parseInt(id) : 0;
    if (this.eventId) {
      this.eventService.getEventById(this.eventId).subscribe((event: any) => {
        this.oldEvent = event;
        this.initialStartDate = new Date(this.oldEvent.eventDate);
        this.initialEndDate = new Date(this.oldEvent.endDate);
        this.editForm.patchValue({
          name: this.oldEvent.name,
          description: this.oldEvent.description,
          location: this.oldEvent.location,
          attendanceNumber: this.oldEvent.attendanceNumber,
          googleMapsLocation: this.oldEvent.googleMapsLocation,
          eventDate: this.initialStartDate,
          budget: this.oldEvent.budget,
          endDate: this.initialEndDate
        });
      });
    }
  }

  showEditModal() {
    this.display = true;
  }

  hideEditModal() {
    this.display = false;
    this.errorMessage = '';
    this.submitted = false;
  }

  checkDate(control: any): { [key: string]: boolean } | null {
    const startDate = this.editForm?.get('eventDate')?.value;
    const endDate = control.value;
    if (startDate && endDate && endDate < startDate) {
      return { 'dateMismatch': true };
    }
    return null;
  }

  saveChanges() {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }
    this.eventService.editEvent(this.eventId, this.editForm.value).subscribe(
      () => {
        this.hideEditModal();
      },
      (error) => {
        console.error('Error saving event data:', error);
        this.errorMessage = 'An error occurred while saving the event. Please try again.';
      }
    );
  }
}
