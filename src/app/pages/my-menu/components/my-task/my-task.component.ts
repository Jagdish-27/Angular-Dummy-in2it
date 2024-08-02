import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css']
})
export class MyTaskComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  arr:object[]=[
    {name:'Assigned to me',count:1,icon:'user'},
    {name:'InQue',count:55, icon:'align-justify'},
    {name:'Overdue',count:56, icon:'clock'},
    {name:'Priority',count:46, icon:'star'},
  ]

}
