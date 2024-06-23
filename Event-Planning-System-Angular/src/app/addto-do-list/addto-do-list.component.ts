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
  constructor(
    private formBuilder: FormBuilder,
    private httpclient: HttpClient,
    private todoService: ToDoListService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.addToDoList = this.formBuilder.group({
      title:['', Validators.required],
      toDoListBudget:['', Validators.required],
      description:['', Validators.required],
      deadLineTime:['', Validators.required],
      eventId:[this.route.snapshot.paramMap.get('id')]
    });
    
  }
  displayAddModal() {
  this.display = true;
  }
  hideAddModal() {
    this.display = false;
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
        console.log(d);
        //this.router.navigate(['/to-do-list']);
      },
      error: e => {
        console.log(e);
      }
    });
  }

}
