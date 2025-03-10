import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-team-task',
  templateUrl: './team-task.component.html',
  styleUrls: ['./team-task.component.css'],
})
export class TeamTaskComponent implements OnInit {
  constructor() {}

  name: string = 'rohit';

  // Data Created for tree like structure maybe useful in the future perspective
  // Building a Recursive Tree Component
  treeStructure_data = {
    name: 'Root',
    children: [
      { name: 'child 1' },
      {
        name: 'child 2',
        children: [
          {
            name: 'subchild 1',
            children: [
              { name: 'childOfSubChild 1' },
              { name: 'childOfSubChild 2', children: [{ name: 'Got child' }] },
            ],
          },
          { name: 'subchild 2' },
        ],
      },
      {
        name: 'child 3',
      },
    ],
  };

  /// data for comment component will be helpful for managing comment like feature in the future where we have nested replies to a comments

  // Displaying a Recursive Comment Thread
  comment_data = {
    author: 'Jagdish',
    text: 'Text of Jagdish',
    replies: [{ author: 'Himmat', text: 'Himmat has replied', replies: [] }], // Allows sub-replies for the new reply.
  };

  // Creating a Recursive Menu Component with Router Links
  menuItems_data = [
    {
      route: 'Home',
      label: 'Home Route',
      submenu: [
        {
          route: 'Dashboard',
          label: 'Dashboard route',
          submenu: [{ route: 'Table', label: 'Table route', submenu: [] }],
        },
      ],
    },
  ];

  userFormObj = {
    name: '',
    email: '',
    address: [{ city: '', country: '' }],
  };

  ngOnInit(): void {}

  get getUserFormArray() {
    return this.userFormObj.address;
  }

  addField() {
    this.getUserFormArray.push({ city: '', country: '' });
  }

  deleteField(i: number) {
    this.getUserFormArray.splice(i, 1);
  }
  onSubmit(_form: NgForm) {
    console.log(this.userFormObj);
  }

  runSettingsOnStart() {
    console.log('log from app initializer');
  }
}
