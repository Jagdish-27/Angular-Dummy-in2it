import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationDetailComponent } from './organization-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
import { OrgDataService } from 'src/app/services/org-data.service';

describe('OrganizationDetailComponent', () => {
  let component: OrganizationDetailComponent;
  let fixture: ComponentFixture<OrganizationDetailComponent>;
  let serverService:ServerService;
  let router:Router
  let orgDataService:OrgDataService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationDetailComponent ],
      imports:[RouterTestingModule,NgbModule,
        NgbNavModule,]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationDetailComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    serverService = TestBed.inject(ServerService);
    router = TestBed.inject(Router);
    orgDataService = TestBed.inject(OrgDataService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should test route url',()=>{
    spyOn(router,'navigate');
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalled();

  })

  it('should test for id not equal to 0',()=>{

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
    
    serverService.setCurrentTabId(1);
    
    component.ngOnInit();
    localStorage.setItem('Organization_Data',JSON.stringify(mockData));
    
    const expectedOrgData = orgDataService.getOrgData().find((data: { id: number; }) => data.id == 1);

    console.log(expectedOrgData);
    
    // expect(component.activeOrgData).toEqual(expectedOrgData);
  })

 
  
});
