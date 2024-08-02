import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgContacsComponent } from './org-contacs.component';

describe('OrgContacsComponent', () => {
  let component: OrgContacsComponent;
  let fixture: ComponentFixture<OrgContacsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgContacsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgContacsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
