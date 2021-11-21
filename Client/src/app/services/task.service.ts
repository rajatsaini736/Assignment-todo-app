import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ParentTaskResponse } from 'src/app/models/parent-task-response';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  readonly _url: string;

  constructor(
    private _http: HttpClient
  ) { 
    // super();
    this._url = environment.API;
  }

  getAllTask(): Promise<ParentTaskResponse> {
    return this._http.get<ParentTaskResponse>(this._url + ``)
            .toPromise();
  }

  postNewParentTask(payload: any): Promise<ParentTaskResponse> {
    return this._http.post<ParentTaskResponse>(this._url + `/create`, payload)
            .toPromise();
  }

  updateParentTask(payload: any, taskId: string): Promise<ParentTaskResponse> {
    return this._http.put<ParentTaskResponse>(this._url + `/${taskId}`, payload )
            .toPromise();
  }
}
