import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListDataComponent } from './task-list-data.component';

describe('TaskListDataComponent', () => {
  let component: TaskListDataComponent;
  let fixture: ComponentFixture<TaskListDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskListDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
