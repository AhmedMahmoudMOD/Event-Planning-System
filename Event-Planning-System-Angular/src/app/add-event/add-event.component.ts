import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { EventService } from '../shared/services/event.service';
import { HttpClient } from '@angular/common/http';
import { eventTypes } from '../shared/models/eventTypes';
import { DropdownModule } from 'primeng/dropdown';
import { DatePipe } from '@angular/common';

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
  ],
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  display: boolean = false;
  addEventForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  minDate: Date = new Date();
  errorMessage: string = '';
  Types : eventTypes[] = [ 
    {id: 1, name: 'Wedding'}, 
    {id: 2, name: 'Birthday'}, 
    {id: 3, name: 'Corporate'}, 
    {id: 4, name: 'Social'}, 
    {id: 6, name: 'Other'}
  ];

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private httpclient: HttpClient,
    private router: Router
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
      endDate: ['', [Validators.required, this.checkDate.bind(this)]]
    });
  }

  ngOnInit(): void {
   
  }
checkDate(endDate: any): boolean {
  const datePipe = new DatePipe('en-US');
 const eventDate = this.addEventForm.get('eventDate')?.value;
  const endDateValue = datePipe.transform(endDate, 'yyyy-MM-dd');
  const eventDateValue = datePipe.transform(eventDate, 'yyyy-MM-dd');
  if ( endDateValue! <= eventDateValue!) {
    return false;
  }
  return true;

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
      console.log(this.addEventForm.value);
      console.log('Form is invalid:', this.addEventForm.errors);
      return;
    }

    // Ensure eventType is a number
    const event = this.addEventForm.value;
    event.eventType = Number(event.eventType);
    console.log(event);
  
    this.eventService.addEvent(event).subscribe({
      next: (response: any) => {
        
        this.hideAddModal();
      },
      error: (error: any) => {
        console.error('Error adding event:', error);
        if (error.status === 400 && error.error) {
          console.error('Validation errors:', error.error.errors);
        }
        this.errorMessage = 'An error occurred while adding the event. Please try again.';

      }
    });
  }
}
