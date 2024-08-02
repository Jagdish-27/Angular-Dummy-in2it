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
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit()',()=>{
    const mockGridOptions = {
      context:{
        componentParent:{},
        parent:'orgContacts'
      }
    }

    component.ngOnInit();

    expect(component.gridOptions).toBeDefined();
    expect(component.gridOptions.context.parent).toEqual(mockGridOptions.context.parent);
  })

  it('should test ngOnChanges',()=>{
    component.contactDetailData = {
      email: 'user@gmail.com',
      role: 'admin',
      phone: '7894661235',
      id: 0,
      firstName: 'rohit',
      lastName: 'kohli',
      phone_code: '+91',
      additional_role: 'nothing',
      remarks: 'test',
      other_medium: ['facebook']
    } as any

    component.ngOnChanges();

    expect(component.contactDetailData).toBeDefined();
  })


  it('should test onRowClick method',()=>{
    const contactDetailData = {
      email: 'user@gmail.com',
      role: 'admin',
      phone: '7894661235',
      id: 0,
      firstName: 'rohit',
      lastName: 'kohli',
      phone_code: '+91',
      additional_role: 'nothing',
      remarks: 'test',
      other_medium: ['facebook']
    } as any
    component.onRowClick(contactDetailData);

    expect(component.rowData).toEqual(contactDetailData);
  })

  it('should test closeSideForm method, onNameClick method',()=>{
    component.onNameClick()
    component.closeSideForm();
    expect(component.isActiveForm).toBeFalse();
  })

  it('should test onContactChecked method',()=>{
    const mockData = [{}];

    component.onContactChecked(mockData);

    expect(component.rowData).toBeDefined();

    const mockData2 = {id:1,contactId:1, name:'rohit'};

    component.onContactChecked(mockData2);

    expect(component.isActiveForm).toBeTrue();
  })
  
});
