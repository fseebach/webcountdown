import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { timeout } from 'q';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {

  public targetDate: moment.Moment;

  public yearsDiff = new BehaviorSubject<number>(0);
  public daysDiff = new BehaviorSubject<number>(0);
  public hoursDiff = new BehaviorSubject<number>(0);
  public minutesDiff = new BehaviorSubject<number>(0);
  public secondsDiff = new BehaviorSubject<number>(0);

  constructor() { 
    this.targetDate = moment().add(1,'years').add(1,'months').add(1,'hours').add(1,'minutes').add(30, 'seconds');
  }

  private refresh(){
    
    setTimeout(this.refresh,1000);
  }

  ngOnInit() {
    setInterval(() => {
      let secondsDiff = this.targetDate.diff(moment(),'seconds');
      let yearsDiff = Math.floor(secondsDiff / 60 / 60 / 24 / 365);
      secondsDiff = secondsDiff - (yearsDiff * 60 * 60 * 24 * 365);
      let daysDiff = Math.floor(secondsDiff / 60 / 60 / 24);
      secondsDiff = secondsDiff - (daysDiff * 60 * 60 * 24);
      let hoursDiff = Math.floor(secondsDiff / 60 / 60);
      secondsDiff = secondsDiff - (hoursDiff * 60 * 60);
      let minutesDiff = Math.floor(secondsDiff / 60);
      secondsDiff = secondsDiff - (minutesDiff * 60);
      this.yearsDiff.next(yearsDiff);
      this.daysDiff.next(daysDiff);
      this.hoursDiff.next(hoursDiff);
      this.minutesDiff.next(minutesDiff);
      this.secondsDiff.next(secondsDiff);
    },1000);
  }

}
