import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../shared/services/event.service';
import { ActivatedRoute } from '@angular/router';
import { EditEvent } from '../shared/models/EditEvent';
import { CalendarModule } from 'primeng/calendar';
import { MatRadioModule } from '@angular/material/radio'; // Correct module import
import swal from 'sweetalert';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    MatRadioModule // Correct module import
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
  error = '';

  constructor(
    private eventService: EventService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      attendanceNumber: [0, Validators.required],
      googleMapsLocation: [''],
      eventDate: [null, Validators.required],
      budget: [0, Validators.required],
      endDate: [null, Validators.required],
      isPrivate: [true, Validators.required] 
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
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
          endDate: this.initialEndDate,
          isPrivate: this.oldEvent.isPrivate
        });
      });
    }
  }

  // Prevent changing with the mouse wheel
  onScroll(event: any) {
    event.preventDefault();
  }

  showEditModal() {
    if(this.oldEvent.endDate < new Date().toISOString()) {
      swal('Error', 'Cannot edit an event that has already ended', 'error');
      return;
    }
    this.display = true;
  }

  hideEditModal() {
    this.display = false;
  }

  saveChanges() {
    if (this.editForm.invalid) {
      return;
    }

    const event = this.editForm.value;
    event.eventType = Number(event.eventType);
    
    // Ensure isPrivate is a boolean
    event.isPrivate = event.isPrivate === 'true';

    // Wrap the event object in the newEventDTO object if needed
    const requestBody = { newEventDTO: event };

    console.log(requestBody);
      this.eventService.editEvent(this.eventId, this.editForm.value).subscribe(
        () => {
          this.hideEditModal();
        },
        (error) => {
          this.error = 'Error saving event data';
          console.error('Error saving event data:', error);
        }
      );
    }
  }

