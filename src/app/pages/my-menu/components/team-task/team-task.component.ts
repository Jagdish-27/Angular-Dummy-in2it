import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-team-task',
  templateUrl: './team-task.component.html',
  styleUrls: ['./team-task.component.css'],
})
export class TeamTaskComponent implements OnInit{


  constructor() {}

  name:string = 'rohit';
  userFormObj = {
    name: '',
    email: '',
    address: [{ city: '', country: '' }],
  };

  
  ngOnInit(): void {

  }
  
  get getUserFormArray() {
    return this.userFormObj.address;
  }

  addField() {
    this.getUserFormArray.push({ city: '', country: '' });
  }

  deleteField(i:number){
    this.getUserFormArray.splice(i,1);
  }
  onSubmit(_form:NgForm) {
    console.log(this.userFormObj)

  }

  runSettingsOnStart(){
    console.log('log from app initializer')
  }
  
}
