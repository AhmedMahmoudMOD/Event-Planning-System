import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToDoList } from '../shared/models/ToDoList';
import { HttpClient } from '@angular/common/http';
import { ToDoListService } from '../shared/services/to-do-list.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-editto-do-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    RouterModule,
    CalendarModule,
  ],
  templateUrl: './editto-do-list.component.html',
  styleUrl: './editto-do-list.component.css'
})
export class EdittoDoListComponent implements OnInit {
  oldToDoList!: ToDoList;
  editToDoList!: FormGroup;
submitted: boolean = false;
minDate: Date = new Date();
display: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private httpclient: HttpClient,
    private todoService: ToDoListService
  ) { 
    this.editToDoList = this.formBuilder.group({
      title:[''],
      toDoLiistBudjet:[''],
      description:[''],
      deadLineTime:[''],
      eventId:['']
    });
  }

  ngOnInit(): void {
    // this.todoService.getSpecificToDoList().subscribe((todo: any) => {
    //   this.oldToDoList = todo;
    //   this.editToDoList.patchValue({
    //     title: this.oldToDoList.title,
    //     toDoLiistBudjet: this.oldToDoList.toDoListBudget,
    //     description: this.oldToDoList.description,
    //     deadLineTime: this.oldToDoList.deadLineTime,
    //     eventId: this.oldToDoList.eventId
    //   });
    // });
  }
  displayEditModal() {
    this.display = true;
  }
  hideEditModal() {
    this.display = false;
  }

  editToDoListmod(){
   
  }

}
