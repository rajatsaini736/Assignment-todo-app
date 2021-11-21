import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() { }

  extractDataPromise(res: { success: boolean, data: any }) {
    return res.data || {};
  }

  handleCatchErrorPromise(error: any) {
    console.log(error);
    return error;
  }
}
