import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  login(user): Observable<any> {
    return this.http.get<any>('localhost:3000/demo/tasks');
  }

  signup(user): Observable<any> {
    return this.http.get<any>('localhost:3000/demo/tasks');
  }
}
