import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAccordionWithDiffComponent } from './table-accordion-with-diff.component';

describe('TableAccordionWithDiffComponent', () => {
  let component: TableAccordionWithDiffComponent;
  let fixture: ComponentFixture<TableAccordionWithDiffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableAccordionWithDiffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAccordionWithDiffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
