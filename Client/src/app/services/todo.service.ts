import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly _url: string;

  constructor(
    private http: HttpClient
  ) {
    this._url = environment.API;
   }

  getTasks(str = ""): Observable<any>  {
    return this.http.get<any>(this._url + `/demo/tasks`);
  }

  addTask(task): Observable<any> {
    return this.http.post<any>(this._url + `/demo/task`, task);
  }

  deleteTask(taskId): Observable<any> {
    return this.http.delete<any>(this._url + `/demo/task/${taskId}`);
  }

  editTak(task): Observable<any> {
    return this.http.put<any>(this._url + `/demo/task`, task);
  }
}
