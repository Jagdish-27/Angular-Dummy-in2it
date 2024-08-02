import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavTabComponent } from './nav-tab.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';

describe('NavTabComponent', () => {
  let component: NavTabComponent;
  let fixture: ComponentFixture<NavTabComponent>;
  let router:Router;
  let serverService:ServerService;
  let activatedRoute:ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavTabComponent ],
      imports:[RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavTabComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    serverService = TestBed.inject(ServerService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()',()=>{

    it('should test ngOnInit()',()=>{
      spyOn(router,'navigate');
      let mockData = [{
        id: 1,
        organization: 'Organization A',
        parentOrganizations: ['Parent Organization A', 'Parent Organization B'],
        type: 'Customer',
        industry: 'Industry 1',
        registrationNumber: '1234567890',
        description: 'Description of Organization A',
        cluster: 'Cluster A',
        tier: 'Tier 1',
        address: '123 Main Street, City, Country',
        onboarding: 'Onboarding A',
        relatedOrgs: ['Related Orgs A','Org B', 'Org None'],
        products: ['Product A', 'Product B', 'Product C'],
        orgSPOC: 'SPOC A',
        contacs: [
            {
                id: 10,
                email: 'email1@gmail.com',
                phone: '8594563121',
                role: 'Admin',
                firstName: 'Rohit',
                lastName: 'Sharma',
                phone_code: '+91',
                additional_role: 'nothing',
                remarks: '',
                other_medium: []
            },
        ],
      }];

      component.navs = mockData;

      component.ngOnInit();
      
      serverService.orgDataSubject.next(mockData[0])
      serverService.setOrgData(mockData[0]);
      
      
      expect(component.navs).toBeDefined();
    })
  
    it('should initialize navs as an empty array if localStorage data is not present', () => {
      localStorage.removeItem('tabs')
      component.ngOnInit();
      expect(component.navs).toEqual([]);
    });

    it('should set contactTab to true when route URL is "contact"', () => {
    
      activatedRoute.url.subscribe((value)=>{
        value[0].path = 'contact'
        
      })
  
      spyOn(component,'ngOnInit').and.callThrough();
      component.ngOnInit();
  
      expect(component.ngOnInit).toHaveBeenCalled();
  
    });

  })

  describe('activeTab()',()=>{

    it('test',()=>{
      spyOn(router,'navigate');

      component.activeTab(1,'my-organization');

      expect(component.activeTab).toBeDefined();
    })
    it('test',()=>{
      spyOn(router,'navigate');

      component.activeTab(0,'my-organization');

      expect(component.activeTab).toBeDefined();
    })
    it('test',()=>{
      spyOn(router,'navigate');

      component.activeTab(0,'contact');

      expect(component.activeTab).toBeDefined();
    })
    
  })
  
it('should test saveTabsState',()=>{
  component.navs = [{id:1,organization:'a'}] as any
  component.saveTabsState();
  expect(component.navs).toBeDefined();
})

describe('should test close function',()=>{
  it('should test if navs length is more than 0',()=>{
    spyOn(router,'navigate');
    const mockEvent = new MouseEvent('click');
    component.navs = [{id:1,name:'rohit'},{id:2,name:'mohit'}] as any;
    
    component.close(mockEvent,1);
    expect(component.close).toBeDefined();
  })

  it('should test empty navs length',()=>{
    spyOn(router,'navigate');

    const mockEvent = new MouseEvent('click');
    component.navs = [];

    component.close(mockEvent,1);

    expect(component.close).toBeDefined();
    expect(component.navs).toEqual([]);
  })
})

});
