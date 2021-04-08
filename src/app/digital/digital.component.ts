import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClockengineService } from '../clockengine.service';

@Component({
  selector: 'app-digital',
  templateUrl: './digital.component.html',
  styleUrls: ['./digital.component.scss']
})
export class DigitalComponent implements OnInit {

  public timeDataSubscription : Subscription
  public dateTime: any;
  hour: number;
  min: number;
  sec: number;
  am_pm: string;
  public currentDateTime: string;

  constructor(private _service: ClockengineService) { }

  ngOnInit(): void {
    this.timeDataSubscription = this._service.getTime()
    .subscribe(response => {
      this.dateTime = response; 
      this.updateDateTime();
    });
  }
  
  updateDateTime() {
    let hour = this.dateTime.getHours();
    let min = this.dateTime.getMinutes();
    let sec = this.dateTime.getSeconds();
    let am_pm = "AM";
  
    if (hour > 12) {
        hour -= 12;
        this.am_pm = "PM";
    }
    if (hour == 0) {
        hour = 12;
        this.am_pm = "AM";
    }
    this.hour = hour < 10 ? "0" + hour : hour;
    this.min = min < 10 ? "0" + min : min;
    this.sec = sec < 10 ? "0" + sec : sec;
  }
}
