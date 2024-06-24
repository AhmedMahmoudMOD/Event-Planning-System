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

  addToDo(todo: ToDoList){
    return this.http.post<ToDoList>(`${environment.apiUrl}/api/ToDoList`, todo);
  }

  deleteToDoList(eventId: number,name:string){
    return this.http.delete(`${environment.apiUrl}/api/ToDoList/${eventId}/${name}`);
  }

  updateTask(eventId: number,title:string, task: any){
    return this.http.put(`${environment.apiUrl}/api/ToDoList/${eventId}/${title}`, task);
  }
  getSpecificToDoList(id: number,name:string){
    return this.http.get(`${environment.apiUrl}/api/ToDoList/${id}/${name}`);
  }

}
