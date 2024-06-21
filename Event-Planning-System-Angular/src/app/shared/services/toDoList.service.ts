import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";
import { ToDoList } from "../models/ToDoList";


export class ToDoListService {
  constructor(private httpclient:HttpClient) { }
  getTodoList(){
    return this.httpclient.get(environment.apiUrl + '/api/ToDoList' );
  }
  addTask(task: ToDoList){
    return this.httpclient.post(environment.apiUrl + '/api/ToDoList', task);
  }
  deleteTask(id: number){
    return this.httpclient.delete(environment.apiUrl + '/api/ToDoList/' + id);
  }
  editTask(id: number, task: ToDoList){
    return this.httpclient.put(environment.apiUrl + '/api/ToDoList/' + id, task);
  }
  
}