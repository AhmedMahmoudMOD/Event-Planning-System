import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ToDoList } from '../models/ToDoList';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  constructor(
    private http: HttpClient
  ) { }

  getToDoList(eventId:number):Observable<ToDoList[]>{
    return this.http.get<ToDoList[]>(`${environment.apiUrl}/api/ToDoList/${eventId}`);
  }

  addTask(task: ToDoList){
    return this.http.post(`${environment.apiUrl}/api/ToDoList`, task);
  }

  deleteToDoList(id: number){
    return this.http.delete(`${environment.apiUrl}/api/ToDoList/${id}`);
  }

  updateTask(id: number, task: any){
    return this.http.put(`${environment.apiUrl}/api/ToDoList/${id}`, task);
  }

}
