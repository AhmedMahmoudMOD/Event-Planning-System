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

  constructor(
    private eventService: EventService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
  
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      location: ['', Validators.required],
      attendanceNumber: [0, Validators.required],
      googleMapsLocation: [''],
      eventDate: ['', Validators.required],
      budget: [0, Validators.required],
      endDate: ['', Validators.required]
    });
    
  }

  ngOnInit(): void {
    var event = this.eventService.getEventById(4);
    console.log(event);
   const id = (this.route.snapshot.paramMap.get('id'));
    this.eventId = id ? parseInt(id) : 0;
    if (this.eventId) {
      this.eventService.getEventById(this.eventId).subscribe((event: any) => {
        this.oldEvent = event;
        this.editForm.patchValue({
          name: this.oldEvent.name,
          description: this.oldEvent.description,
          location: this.oldEvent.location,
          attendanceNumber: this.oldEvent.attendanceNumber,
          googleMapsLocation: this.oldEvent.googleMapsLocation,
          eventDate: Date.parse(this.oldEvent.eventDate),
          budget: this.oldEvent.budget,
          endDate: this.oldEvent.endDate
        });
        console.log(Date.parse(this.oldEvent.eventDate));
      });
  }
}
  showEditModal() {
    this.display = true;
  }

  hideEditModal() {
    this.display = false;
  }

  saveChanges() {
    if (this.editForm.valid) {
      this.eventService.editEvent(this.eventId, this.editForm.value).subscribe(
        () => {
          this.hideEditModal();
        },
        (error) => {
          console.error('Error saving event data:', error);
        }
      );
    }
  }
  
}
