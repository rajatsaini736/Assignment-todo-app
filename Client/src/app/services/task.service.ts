import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseService {

  readonly _url: string;

  constructor(
    private _http: HttpClient
  ) { 
    super();
    this._url = environment.API;
  }

  getAllTask() {
    console.log('calling api');
    return this._http.get(this._url + ``)
            .pipe(map(this.extractDataPromise), catchError(this.handleCatchErrorPromise))
            .toPromise();
  }
}
