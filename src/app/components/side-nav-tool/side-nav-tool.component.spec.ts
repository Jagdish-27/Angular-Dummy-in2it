import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavToolComponent } from './side-nav-tool.component';

describe('SideNavToolComponent', () => {
  let component: SideNavToolComponent;
  let fixture: ComponentFixture<SideNavToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNavToolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
