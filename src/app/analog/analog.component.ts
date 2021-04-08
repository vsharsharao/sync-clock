import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { ClockengineService } from './../clockengine.service';

@Component({
  selector: 'app-analog',
  templateUrl: './analog.component.html',
  styleUrls: ['./analog.component.scss']
})
export class AnalogComponent implements OnInit, AfterViewInit {

  @ViewChild('analogClock', {static: false}) analogClock: ElementRef;
  public context: CanvasRenderingContext2D;
  public radius: number;
  public timeDataSubscription : Subscription
  public dateTime: any;

  constructor(private _service: ClockengineService) { }

  ngOnInit(): void {
    this.timeDataSubscription = this._service.getTime()
    .subscribe(response => {this.dateTime = response;})
  }

  ngAfterViewInit(): void {
    this.context = this.analogClock.nativeElement.getContext('2d');
    this.radius = this.analogClock.nativeElement.height / 2;
    this.context.translate(this.radius, this.radius);

    this.radius = this.radius * 0.90;

    setInterval(() => {
      this.drawFace(this.context, this.radius);
      this.drawNumbers(this.context, this.radius);
      this.drawTime(this.context, this.radius); 
    }, 1000);
  }

  //This code to create an analog clock is imported from w3schools
  drawFace(context: CanvasRenderingContext2D, radius: number) {
    var grad;
    context.beginPath();
    context.arc(0, 0, radius, 0, 2*Math.PI);
    context.fillStyle = 'white';
    context.fill();
    grad = context.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
    grad.addColorStop(0, '#ff6347');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#ff6347');
    context.strokeStyle = grad;
    context.lineWidth = radius*0.1;
    context.stroke();
    context.beginPath();
    context.arc(0, 0, radius*0.1, 0, 2*Math.PI);
    context.fillStyle = '#ff6347';
    context.fill();
  }

  drawNumbers(context: CanvasRenderingContext2D, radius: number) {
    var ang;
    var num;
    context.font = radius*0.15 + "px arial";
    context.textBaseline="middle";
    context.textAlign="center";
    for(num = 1; num < 13; num++){
      ang = num * Math.PI / 6;
      context.rotate(ang);
      context.translate(0, -radius*0.85);
      context.rotate(-ang);
      context.fillText(num.toString(), 0, 0);
      context.rotate(ang);
      context.translate(0, radius*0.85);
      context.rotate(-ang);
    }
  }

  drawTime(context: CanvasRenderingContext2D, radius: number){
      var now = this.dateTime;
      var hour = now.getHours();
      var minute = now.getMinutes();
      var second = now.getSeconds();
      //hour
      hour=hour%12;
      hour=(hour*Math.PI/6)+
      (minute*Math.PI/(6*60))+
      (second*Math.PI/(360*60));
      this.drawHand(context, hour, radius*0.5, radius*0.07);
      //minute
      minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
      this.drawHand(context, minute, radius*0.8, radius*0.07);
      // second
      second=(second*Math.PI/30);
      this.drawHand(context, second, radius*0.9, radius*0.02);
  }

  drawHand(context: CanvasRenderingContext2D, pos: number, length: number, width: number) {
    context.beginPath();
    context.lineWidth = width;
    context.lineCap = "round";
    context.moveTo(0,0);
    context.rotate(pos);
    context.lineTo(0, -length);
    context.stroke();
    context.rotate(-pos);
  }
}
