import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToDoListService } from '../shared/services/to-do-list.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import  {DialogModule} from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import {  CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import Swal from 'sweetalert2';
import { EventService } from '../shared/services/event.service';
import { eventTypes } from '../shared/models/eventTypes';
import { Event } from '../shared/models/event';
@Component({
  selector: 'app-addto-do-list',
  standalone: true,
  imports: [
    CommonModule,DialogModule,RouterModule,CalendarModule,ReactiveFormsModule,FloatLabelModule],
  templateUrl: './addto-do-list.component.html',
  styleUrl: './addto-do-list.component.css'
})
export class AddtoDoListComponent implements OnInit {
display: boolean = false;
addToDoList: FormGroup = new FormGroup({});
submitted: boolean = false;
minDate: Date = new Date();
event!: Event;
eventDeadLine: Date = new Date();
err: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private httpclient: HttpClient,
    private todoService: ToDoListService,
    private route: ActivatedRoute,
    private eventService :EventService
  ) { }

  ngOnInit(): void {
    this.addToDoList = this.formBuilder.group({
      title:['', Validators.required],
      toDoListBudget:['', Validators.required],
      description:['', Validators.required],
      deadLineTime:['', Validators.required],
      eventId:[this.route.snapshot.paramMap.get('id')]
    });
    this.getEvent();
    
  }
  getEvent(){
    const id = this.route.snapshot.paramMap.get('id');

    this.eventService.getEventById(id? parseInt(id):0).subscribe((ev:any ) => {
      this.event = ev;
      this.eventDeadLine = new Date(this.event.eventDate);
      
      });
    
  }
  displayAddModal() {
    this.getEvent();
    console.log(this.eventDeadLine);
  if(new Date() > this.eventDeadLine){
    Swal.fire({
      title: 'Error!',
      text: 'The event deadline has passed. You cannot add a to-do item to this event.',
      icon: 'error',
      confirmButtonText: 'Ok'
    });
    return;
  }
  this.display = true;
  }
  hideAddModal() {
    this.display = false;
    this.err = '';
  }
  addTodo(){
    this.submitted = true;
    if(this.addToDoList.invalid){
      console.log('Invalid form');
      return;
    }
    console.log(this.addToDoList.value);
    var todo = this.addToDoList.value;
    this.todoService.addToDo(todo).subscribe({
      next: d => {
        this.hideAddModal();
        Swal.fire({
          title: 'Success!',
          text: 'To-do item added successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        
        });
      },
      error: e => {
        console.log(e);
        this.err = e.error;
        //An error occurred while adding the to-do item. Please try again.
        
      }
    });
  }

}
