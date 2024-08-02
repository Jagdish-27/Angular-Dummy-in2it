import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsComponent } from './charts.component';

describe('ChartsComponent', () => {
  let component: ChartsComponent;
  let fixture: ComponentFixture<ChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test updateChart with next',()=>{
    component.prevNumber = 1
    component.updateChart('next');
    expect(component.prevNumber).toBe(2);
  })

  it('should test updateChart with prev',()=>{
    component.prevNumber = 2;
    component.updateChart('prev');
    expect(component.prevNumber).toBe(1);
  })
});
