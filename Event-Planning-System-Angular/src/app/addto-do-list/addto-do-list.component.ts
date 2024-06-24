import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToDoListService } from '../shared/services/to-do-list.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import Swal from 'sweetalert2';
import { EventService } from '../shared/services/event.service';
import { Event } from '../shared/models/event';
import { ToDoList } from '../shared/models/ToDoList';

@Component({
  selector: 'app-addto-do-list',
  standalone: true,
  imports: [
    CommonModule, DialogModule, RouterModule, CalendarModule, ReactiveFormsModule, FloatLabelModule
  ],
  templateUrl: './addto-do-list.component.html',
  styleUrls: ['./addto-do-list.component.css']
})
export class AddtoDoListComponent implements OnInit {
  display: boolean = false;
  addToDoList: FormGroup = new FormGroup({});
  submitted: boolean = false;
  minDate: Date = new Date();
  event!: Event;
  eventDeadLine: Date = new Date();
  err: string = '';
  toDoLists: ToDoList[] = [];
  totalBudget: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private httpclient: HttpClient,
    private todoService: ToDoListService,
    private route: ActivatedRoute,
    private eventService: EventService,
    private toDoListService: ToDoListService
  ) { }

  ngOnInit(): void {
    this.addToDoList = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      toDoListBudget: ['', [Validators.required, this.checkbudget.bind(this)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      deadLineTime: ['', Validators.required],
      eventId: [this.route.snapshot.paramMap.get('id')]
    });
    this.getEvent();
    this.getAllToDoList();
  }

  checkbudget(control: AbstractControl) {
    if (this.totalBudget < control.value) {
      return { budgetExceeded: true };
    }
    return null;
  }

  getEvent() {
    const id = this.route.snapshot.paramMap.get('id');

    this.eventService.getEventById(id ? parseInt(id) : 0).subscribe((ev: any) => {
      this.event = ev;
      this.eventDeadLine = new Date(this.event.endDate);
      this.totalBudget = this.event.budget ? this.event.budget : 0;
    });
  }

  getAllToDoList() {
    const id = this.route.snapshot.paramMap.get('id');
    this.toDoListService.getToDoList(
      id ? parseInt(id) : 0
    ).subscribe({
      next: (res: ToDoList[]) => {
        this.toDoLists = res;
        console.log(this.toDoLists);
      },
      error: (error) => {
        console.error('Error fetching to-do list:', error);
      }
    });
  }

  displayAddModal() {
    this.getEvent();
    console.log(this.eventDeadLine);
    if (new Date() > this.eventDeadLine) {
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

  addTodo() {
    this.submitted = true;
    if (this.addToDoList.invalid) {
      console.log('Invalid form');
      return;
    }
    console.log(this.addToDoList.value);
    var todo = this.addToDoList.value;
    this.todoService.addToDo(todo).subscribe({
      next: d => {
        this.toDoLists.push(d);
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
        console.error('Error adding to-do item:', e);
      }
    });
  }
}
