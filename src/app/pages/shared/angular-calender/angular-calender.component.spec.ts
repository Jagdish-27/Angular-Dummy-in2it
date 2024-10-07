import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularCalenderComponent } from './angular-calender.component';

describe('AngularCalenderComponent', () => {
  let component: AngularCalenderComponent;
  let fixture: ComponentFixture<AngularCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularCalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
