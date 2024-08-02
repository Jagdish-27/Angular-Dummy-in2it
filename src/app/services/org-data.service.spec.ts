import { TestBed } from '@angular/core/testing';

import { OrgDataService } from './org-data.service';

describe('OrgDataService', () => {
  let service: OrgDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrgDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user data', () => {
    let orgData = {
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
      relatedOrgs: ['Related Orgs A', 'Org B', 'Org None'],
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
          other_medium: [],
        },
      ],
    };
    localStorage.setItem('Organization_Data', JSON.stringify(orgData));
    const result = service.getOrgData();
    expect(result).toEqual(orgData);
  });

  it('should return and empty array if local storage is empty', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const result = service.getOrgData();
    expect(result).toEqual([]);
  });

  it('should set the data to local', () => {
    let orgData = {
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
      relatedOrgs: ['Related Orgs A', 'Org B', 'Org None'],
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
          other_medium: [],
        },
      ],
    };

    service.setOrgDataToLocal(orgData);

    let result = service.getOrgData();
    expect(result).toEqual(orgData);
  });

  
});
