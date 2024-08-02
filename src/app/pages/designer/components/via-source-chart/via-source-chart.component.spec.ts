import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViaSourceChartComponent } from './via-source-chart.component';

describe('ViaSourceChartComponent', () => {
  let component: ViaSourceChartComponent;
  let fixture: ComponentFixture<ViaSourceChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViaSourceChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViaSourceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
