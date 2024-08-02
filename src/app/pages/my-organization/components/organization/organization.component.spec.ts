import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationComponent } from './organization.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('OrganizationComponent', () => {
  let component: OrganizationComponent;
  let fixture: ComponentFixture<OrganizationComponent>;
  let router:Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationComponent ],
      imports:[RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit()',()=>{
    spyOn(router,'navigate');
    spyOn(component,'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  })

  it('should test onSideBarSearchValue',()=>{
    const mockEvent = {target:{value:'searchVal'}};

    component.onSideBarSearchValue(mockEvent);

    expect(component.onSideBarSearchValue).toBeDefined();
  })
  
  it('should test sideSearchFilter',()=>{
    component.sideSearchFilter('');
    expect(component.sideSearchFilter).toBeDefined()
  })

  it('should test filterOrganization',()=>{
    component.filterOrganization('Customer');
    expect(component.currentActiveVal).toBe('Customer');

    component.filterOrganization('Non Customer');
    expect(component.currentActiveVal).toBe('Non Customer');

    component.filterOrganization('');
    expect(component.currentActiveVal).toBe('');
  })

  it('should test on onSearchValue',()=>{
    const mockEvent = {target:{value:'searchVal'}};
    component.onSearchValue(mockEvent);
    expect(component.onSearchValue).toBeDefined();
  })


  it('should test filterOrgData',()=>{
    component.filterOrgData('');
    expect(component.filterOrgData).toBeDefined();
  })

  it('should test organizationClicked',()=>{
    let mockOrgData:any = {id:1,orgId:1,name:'organization A'};
    component.organizationClicked(mockOrgData);
    expect(component.organizationClicked).toBeDefined();
  })

  describe('valueGetter',()=>{

    it('should test email colDefs params val',()=>{
      let params = { data:{contacs:[{email:'user@gmail.com'}]}}
      
      let initialCol:any = component.colDefsTable[7];
      let result = initialCol.valueGetter(params);

      expect(result).toEqual('user@gmail.com');
    })

    it('should test phone colDefs params val',()=>{
      let params = { data:{contacs:[{phone:'872700555'}]}}
      
      let initialCol:any = component.colDefsTable[8];
      let result = initialCol.valueGetter(params);

      expect(result).toEqual('872700555');
    })
  })
});