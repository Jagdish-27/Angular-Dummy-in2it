import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationLogicComponent } from './pagination-logic.component';

describe('PaginationLogicComponent', () => {
  let component: PaginationLogicComponent;
  let fixture: ComponentFixture<PaginationLogicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationLogicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationLogicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
