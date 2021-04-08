import { Component, OnInit } from '@angular/core';

import { ClockengineService } from './../clockengine.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  userDateInput: Date;
  constructor(private _service: ClockengineService) { }

  ngOnInit(): void {
    this.userDateInput = new Date();
    setInterval(() => {
      this.userDateInput.setSeconds(this.userDateInput.getSeconds() + 1);
      this._service.setTime(this.userDateInput);
    }, 1000);
  }

  addMinutes() {
    console.log("test");
    this.userDateInput.setMinutes(this.userDateInput.getMinutes() + 1); 
  }

  subtractMinutes() {
    this.userDateInput.setMinutes(this.userDateInput.getMinutes() - 1); 
  }

  resetTime () {
    this.userDateInput = new Date();
  }
}
