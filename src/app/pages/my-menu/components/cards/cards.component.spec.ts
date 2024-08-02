import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsComponent } from './cards.component';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit()',()=>{

    let mockData = [{id:1,name:'rohit'},{id:2,name:'mohit'}]

    component.dataArr = mockData;

    component.ngOnInit();

    expect(component.dataArr).toBeDefined();
    expect(component.dataArr).toEqual(mockData);
  })

  it('should test onCardClick',()=>{
    component.onCardClick('Jagdish');

    expect(component.default_name).toBe('Jagdish');
  })
});
