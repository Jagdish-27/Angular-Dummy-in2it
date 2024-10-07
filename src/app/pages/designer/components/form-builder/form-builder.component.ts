import { Component, OnInit } from '@angular/core';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}
@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
})
export class FormBuilderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  tasks: Task[] = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description for Task 1',
      status: 'todo',
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description for Task 2',
      status: 'todo',
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Description for Task 3',
      status: 'inprogress',
    },
    {
      id: 4,
      title: 'Task 4',
      description: 'Description for Task 4',
      status: 'onhold',
    },
    {
      id: 5,
      title: 'Task 5',
      description: 'Description for Task 5',
      status: 'completed',
    },
  ];

  onDragStart(event: DragEvent, task: Task) {
    event.dataTransfer?.setData('text/plain', task.id.toString());
  }

  onDrop(event: DragEvent, newStatus: string) {
    const taskId = Number(event.dataTransfer?.getData('text/plain'));
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.status = newStatus;
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
}
