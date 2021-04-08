import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ClockengineService {

  public timeData = new Subject();

  constructor() { }

  setTime(time) {
    this.timeData.next(time);
  }

  getTime() {
    return this.timeData;
  }
}
