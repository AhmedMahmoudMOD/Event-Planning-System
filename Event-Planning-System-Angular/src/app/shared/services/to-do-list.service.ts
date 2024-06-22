import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ToDoList } from '../models/toDoList';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  constructor(
    private http: HttpClient
  ) { }

  getToDoList():Observable<ToDoList[]>{
    return this.http.get<ToDoList[]>(`${environment.apiUrl}/api/ToDoList`);
  }

  addTask(task: ToDoList){
    return this.http.post(`${environment.apiUrl}/api/ToDoList`, task);
  }

  deleteTask(id: number){
    return this.http.delete(`${environment.apiUrl}/api/ToDoList/${id}`);
  }

  updateTask(id: number, task: any){
    return this.http.put(`${environment.apiUrl}/api/ToDoList/${id}`, task);
  }

}
