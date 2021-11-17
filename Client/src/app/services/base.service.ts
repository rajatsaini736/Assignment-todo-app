import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() { }

  extractDataPromise(res: any) {
    let body = res.json();
    return body.data || {};
  }

  handleCatchErrorPromise(error: any) {
    let body = error.json();
    return body;
  }
}
