import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { addMonths } from 'date-fns/addMonths';
import { endOfMonth } from 'date-fns/endOfMonth';
import { startOfDay } from 'date-fns/startOfDay';
import { startOfMonth } from 'date-fns/startOfMonth';

@Component({
  selector: 'app-angular-calender',
  templateUrl: './angular-calender.component.html',
  styleUrls: ['./angular-calender.component.css']
})
export class AngularCalenderComponent implements OnInit {

  constructor() {
    this.generateYearView();
   }

  ngOnInit(): void {
  }

  viewDate: Date = new Date();
  months: Date[] = [];
  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'An event',
    },
    {
      start: startOfMonth(new Date()),
      end: endOfMonth(new Date()),
      title: 'Another event',
    }
  ];



  generateYearView() {
    const startOfYear = new Date(this.viewDate.getFullYear(), 0, 1);
    for (let i = 0; i < 12; i++) {
      this.months.push(addMonths(startOfYear, i));
    }
  }

  onDayClicked(day: any): void {
    console.log('Day clicked', day);
  }
}
