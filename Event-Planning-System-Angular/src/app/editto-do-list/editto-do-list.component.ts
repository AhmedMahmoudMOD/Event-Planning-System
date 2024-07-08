import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToDoList } from '../shared/models/toDoList';
import { HttpClient } from '@angular/common/http';
import { ToDoListService } from '../shared/services/to-do-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms'; 
import swal from 'sweetalert2';

@Component({
  selector: 'app-editto-do-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    CalendarModule
  ],
  templateUrl: './editto-do-list.component.html',
  styleUrls: ['./editto-do-list.component.css']
})
export class EdittoDoListComponent implements OnInit {
  @Input() toDoList! : ToDoList;
  oldToDoList!: ToDoList;
  editToDoList!: FormGroup;
  submitted: boolean = false;
  minDate: Date = new Date();
  maxDate: Date = new Date();
  display: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private httpclient: HttpClient,
    private todoService: ToDoListService,
    private route: ActivatedRoute,
  ) { 
    this.editToDoList = this.formBuilder.group({
      title: ['', Validators.required],
      toDoListBudget: ['', Validators.required, Validators.min(1)],
      description: ['', Validators.required],
      deadLineTime: ['', Validators.required],
      eventId: ['']
    });
}

  ngOnInit(): void {
    console.log(this.toDoList);
    this.editToDoList.patchValue({
      title: this.toDoList.title,
      toDoListBudget: this.toDoList.toDoListBudget,
      description: this.toDoList.description,
      deadLineTime: this.toDoList.deadLineTime,
      eventId: this.toDoList.eventId
    });
    this.maxDate = new Date(this.toDoList.deadLineTime);
  }

  onMouseWheel(event: any) {
    event.preventDefault();
  }
  displayEditModal() {
    const deadline = new Date(this.toDoList.deadLineTime);
    if( deadline < new Date()) {
      swal.fire('Error', 'Cannot edit To-Do List after deadline', 'error');
      return;
    }
    this.display = true;
  }

  hideEditModal() {
    this.display = false;
  }

  editToDoListmod() {
    this.submitted = true;
    if (this.editToDoList.invalid) {
      return;
    }
    this.todoService.updateTask(this.toDoList.eventId, this.toDoList.title, this.editToDoList.value).subscribe({
      next: (res: any) => {
        this.display = false;
        swal.fire('Success', 'To-Do List updated successfully', 'success');
      },
      error: (err) => {
        console.error('Error updating To-Do List:', err);
      }
    });
  }
}
