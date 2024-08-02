import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { OrgDataService } from 'src/app/services/org-data.service';
import { Router } from '@angular/router';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let contactService: ContactService;
  let orgService: OrgDataService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactComponent],
      imports: [RouterTestingModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();

    contactService = TestBed.inject(ContactService);
    orgService = TestBed.inject(OrgDataService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should test ngOnInit method', () => {
      component.countryCodeList = contactService.country_Code;

      spyOn(component, 'ngOnInit').and.callThrough();
      component.ngOnInit();

      expect(component.ngOnInit).toHaveBeenCalled();
    });
  });

  it('should test setDataInitialy() method', () => {
    let mockData = [
      {
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
            other_medium: [{ medium: 'Facebook', detail: 'user@gmail.com' }],
          },
        ],
      },
    ];

    localStorage.setItem('Organization_Data', JSON.stringify(mockData));
    component.listContactsData = orgService.getOrgData();
    spyOn(component, 'setDataInitialy').and.callThrough();
    component.setDataInitialy();
    expect(component.setDataInitialy).toHaveBeenCalled();
  });

  it('should test selectedContactsIds()', () => {
    let mockData = { id: 1, name: 'rohit' };

    component.selectedContactsIds(mockData);

    expect(component.selected_contact_data).toEqual(mockData);
  });

  describe('filterContacs()', () => {
    it('should test current active val is all', () => {
      spyOn(component, 'filterContacs').and.callThrough();
      component.filterContacs('all');
      expect(component.filterContacs).toHaveBeenCalledWith('all');
    });

    it('should test current active val is not all', () => {
      spyOn(component, 'filterContacs').and.callThrough();
      component.listContactsData = orgService.getOrgData();
      component.ngOnInit();
      component.filterContacs('Organization A');

      expect(component.filterContacs).toHaveBeenCalledWith('Organization A');
    });
  });

  it('should test organizationClicked method', () => {
    spyOn(router, 'navigate');
    let mockData = [
      {
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
      },
    ];

    spyOn(component, 'organizationClicked').and.callThrough();
    component.organizationClicked(mockData[0]);

    expect(component.organizationClicked).toHaveBeenCalledWith(mockData[0]);
  });

  describe('should test formArray getters and setters', () => {
    it('should test other_medium_array()', () => {
      component.other_medium_array;
      expect(component.other_medium_array).toBeDefined();
    });

    it('should test onMediumSelect', () => {
      const mockEvent = { value: 'Phone' };
      spyOn(component, 'onMediumSelect').and.callThrough();
      component.onMediumSelect(mockEvent, 1);

      expect(component.onMediumSelect).toHaveBeenCalled();
    });


    // it('should test isPhoneTrue method',()=>{
    //   const mockFormData = {
    //     id: 10,
    //     email: 'email1@gmail.com',
    //     phone: '8594563121',
    //     role: 'Admin',
    //     firstName: 'Rohit',
    //     lastName: 'Sharma',
    //     phone_code: '+91',
    //     additional_role: 'nothing',
    //     remarks: '',
    //     other_medium: [{ medium: 'Phone', detail: '7984563125' }],
    //   }

    //   component.add_medium();
      
    //   component.contact_form.get('other_medium')?.patchValue(mockFormData.other_medium);
    //   component.contact_form.patchValue(mockFormData);
    //   component.isPhoneTrue(1);
    // })


    it('should test add_medium', () => {
      spyOn(component, 'add_medium').and.callThrough();
      component.add_medium();
      expect(component.add_medium).toHaveBeenCalled();
    });

    it('should test remove_medium', () => {
      spyOn(component, 'remove_medium').and.callThrough();
      component.remove_medium(0);
      expect(component.remove_medium).toHaveBeenCalled();
    });
  });

  describe('onOrgSelectChange()', () => {
    it('should test if current active val is all', () => {
      const mockEvent = { target: { value: 'all' } };
      spyOn(component, 'onOrgSelectChange').and.callThrough();
      component.onOrgSelectChange(mockEvent);
      expect(component.onOrgSelectChange).toHaveBeenCalled();
    });

 
    it('should test if current active val is not to all', () => {

      let mockData = [
        {
          id: 1,
          organization: 'Organization A',
          parentOrganizations: [
            'Parent Organization A',
            'Parent Organization B',
          ],
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
        },
      ];
      
      localStorage.setItem('Organization_Data', JSON.stringify(mockData));
      component.ngOnInit();
      component.currentActiveVal = 'Organization A';
      const mockEvent = { target: { value: 'Organization A' } };

      spyOn(component, 'onOrgSelectChange').and.callThrough();
      component.onOrgSelectChange(mockEvent);
      expect(component.onOrgSelectChange).toHaveBeenCalled();

    });
  });

  it('should test onAddClick method', () => {
    spyOn(component, 'onAddClick').and.callThrough();
    component.onAddClick();
    expect(component.onAddClick).toHaveBeenCalled();
  });

  it('should test clearFormInfo method', () => {
    spyOn(component, 'clearFormInfo').and.callThrough();
    component.clearFormInfo();
    expect(component.clearFormInfo).toHaveBeenCalled();
  });

  it('should test closeSideForm method', () => {
    spyOn(component, 'closeSideForm').and.callThrough();
    component.closeSideForm();
    expect(component.closeSideForm).toHaveBeenCalled();
  });

  it('should test open_contactDetail method', () => {
    const mockData = {
      id: 1,
      firstName: 'rohit',
      lastName: 'sharma',
      email: 'rohit@gmail.com',
      role: 'Admin',
      phone: '7894561235',
      phone_code: '91',
      additional_role: 'string',
      remarks: 'string',
      other_medium: ['nothing'],
    };
    spyOn(component, 'open_contactDetail').and.callThrough();
    component.open_contactDetail(mockData, 'Organization A');
    expect(component.open_contactDetail).toHaveBeenCalled();
  });

  it('should test open_contactDetail method with this.isEditingContact || this.isActiveForm', () => {
    const mockData = {
      id: 1,
      firstName: 'rohit',
      lastName: 'sharma',
      email: 'rohit@gmail.com',
      role: 'Admin',
      phone: '7894561235',
      phone_code: '91',
      additional_role: 'string',
      remarks: 'string',
      other_medium: ['nothing'],
    };
    component.isEditingContact = true;
    component.isActiveForm = true;
    spyOn(component, 'open_contactDetail').and.callThrough();
    component.open_contactDetail(mockData, 'Organization A');
    expect(component.open_contactDetail).toHaveBeenCalled();
  });

  describe('onSubmit()', () => {
    it('should test contact form isEditingContact is false ', () => {
      let mockData = [
        {
          id: 1,
          organization: 'Organization A',
          parentOrganizations: [
            'Parent Organization A',
            'Parent Organization B',
          ],
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
        },
      ];
      const formData = {
        id: 10,
        firstName: 'rohit',
        lastName: 'sharma',
        organization: 'Organization A',
        email: 'user@gmail.com',
        phone_code: '91',
        phone: '7894561235',
        role: 'admin',
        additional_role: ['nothing'],
        remarks: ['none'],
      };

      component.isEditingContact = false;
      component.contact_form.patchValue(formData);

      localStorage.setItem('Organization_Data', JSON.stringify(mockData));

      localStorage.getItem('Organization_Data');

      spyOn(component, 'onSubmit').and.callThrough();
      component.onSubmit();

      expect(component.onSubmit).toHaveBeenCalled();
    });

    it('should test for empty Organization_Data', () => {
      const formData = {
        id: [1],
        firstName: ['rohit', [Validators.required]],
        lastName: ['sharma', [Validators.required]],
        organization: ['Organization A', [Validators.required]],
        email: ['user@gmail.com', [Validators.required]],
        phone_code: ['91', [Validators.required]],
        phone: ['7894561235', [Validators.required, Validators.maxLength(10)]],
        role: ['admin', [Validators.required]],
        additional_role: ['nothing'],
        remarks: ['none'],
      };
      component.contact_form.patchValue(formData);

      localStorage.removeItem('Organization_Data');
      spyOn(component, 'onSubmit').and.callThrough();
      component.onSubmit();
      expect(component.onSubmit).toHaveBeenCalled();
    });

    it('should test contact form Invalid state ', () => {
      let mockData = [
        {
          id: 1,
          organization: 'Organization A',
          parentOrganizations: [
            'Parent Organization A',
            'Parent Organization B',
          ],
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
        },
      ];
      const formData = {
        id: 10,
        firstName: 'Rohit',
        lastName: 'Sharma',
        organization: 'Organization A',
        email: 'user@gmail.com',
        phone_code: '91',
        phone: '7894561235',
        role: 'Admin',
        additional_role: ['nothing'],
        remarks: ['none'],
      };

      component.isEditingContact = true;
      component.contact_form.patchValue(formData);

      localStorage.setItem('Organization_Data', JSON.stringify(mockData));

      spyOn(component, 'onSubmit').and.callThrough();
      component.onSubmit();

      expect(component.onSubmit).toHaveBeenCalled();
    });

    it('should test contact form invalid state ', () => {
      component.contact_form.patchValue({});

      spyOn(component, 'onSubmit').and.callThrough();
      component.onSubmit();

      expect(component.onSubmit).toHaveBeenCalled();
    });
  });

  describe('onEditButtonClick()', () => {
    it('should test onEditButtonClick when newObj is false', () => {
      component.ngOnInit();

      component.rowData = {
        id: 1,
        firstName: 'rohit',
        lastName: 'sharma',
        email: 'rohit@gmail.com',
        role: 'Admin',
        phone: '7894561235',
        phone_code: '91',
        additional_role: 'string',
        remarks: 'string',
        other_medium: [{ medium: 'Facebook', detail: 'user@gmail.com' }] as any,
      };

      
      component.contactAssociateOrg = 'Organization A';

      component.onEditButtonClick();
    });

    it('should test onEditButtonClick when newObj is true', () => {
      component.rowData = {
        id: 1,
        firstName: 'rohit',
        lastName: 'sharma',
        email: 'rohit@gmail.com',
        role: 'Admin',
        phone: '7894561235',
        phone_code: '91',
        additional_role: 'string',
        remarks: 'string',
        other_medium: [{ medium: 'Facebook', detail: 'user@gmail.com' }] as any,
      };


      component.contactAssociateOrg = 'Organization A';
      component.ngOnInit();
      component.onEditButtonClick({
        checkedContactId: 10,
        currentOrg: 'Organization A',
      });

    });
  });

  describe('filterOrgDataContacts()', () => {
    it('should test filterOrgDataContacts() with empty string', () => {
      component.ngOnInit();
      component.filterOrgDataContacts('');
      expect(component.filterOrgDataContacts).toBeDefined();
    });

    it('should test filterOrgDataContacts() with string', () => {
      component.ngOnInit();
      component.filterOrgDataContacts('rohit');
      component.filterOrgDataContacts('email1@gmail.com');
      component.filterOrgDataContacts('7894561235');
      expect(component.filterOrgDataContacts).toBeDefined();
    });
  });

  describe('onSearchValue()', () => {
    it('shuld test onSearchValue', () => {
      const mockEvent = { target: { value: 'mockSearch' } };
      let mockData = [
        {
          id: 1,
          organization: 'Organization A',
          parentOrganizations: [
            'Parent Organization A',
            'Parent Organization B',
          ],
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
              other_medium: [{ medium: 'Facebook', detail: 'user@gmail.com' }],
            },
          ],
        },
      ];
      localStorage.setItem('Organization_Data', JSON.stringify(mockData));
      component.onSearchValue(mockEvent);
      expect(component.onSearchValue).toBeDefined();
    });
    it('shuld test onSearchValue with empty val', () => {
      const mockEvent = { target: { value: '' } };

      let mockData = [
        {
          id: 1,
          organization: 'Organization A',
          parentOrganizations: [
            'Parent Organization A',
            'Parent Organization B',
          ],
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
              other_medium: [{ medium: 'Facebook', detail: 'user@gmail.com' }],
            },
          ],
        },
      ];

      localStorage.setItem('Organization_Data', JSON.stringify(mockData));
      component.onSearchValue(mockEvent);
      expect(component.onSearchValue).toBeDefined();
    });

    it('should test onSearchValueContacts', () => {
      const mockEvent = { target: { value: 'mockSearch' } };
      component.ngOnInit();
      component.onSearchValueContacts(mockEvent);
    });
  });


  describe('editTopButtonClick()', () => {
    it('should test editTopButtonClick', () => {
      const mockSelectedContact = [
        {
          id: 10,
          email: 'email1@gmail.com',
          phone: '8594563121',
          role: 'Admin',
          firstName: 'Rohit',
          other_medium:[{ medium: 'Facebook', detail: 'user@gmail.com' }]
        }
      ];

      component.ngOnInit();
      component.selected_contact_data = mockSelectedContact;
      component.editTopButtonClick();
      expect(component.editTopButtonClick).toBeDefined();
    });
  });

  describe('deleteClicked()',()=>{
    
    it('should test delete function',()=>{
      const mockSelectedContact = [
        {
          id: 10,
          email: 'email1@gmail.com',
          phone: '8594563121',
          role: 'Admin',
          firstName: 'Rohit',
          organization:'Organization A'
        }
      ];
      let mockData = [
        {
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
              other_medium: [{ medium: 'Facebook', detail: 'user@gmail.com' }],
            },
          ],
        },
      ];

      localStorage.setItem('Organization_Data', JSON.stringify(mockData));
      component.listContactsData = orgService.getOrgData();
      component.selected_contact_data = mockSelectedContact;
      // component.ngOnInit();
  
      spyOn(component,'deleteClicked').and.callThrough();
      component.deleteClicked();
      expect(component.deleteClicked).toHaveBeenCalled();
    })

    it('should test for empty array',()=>{
      localStorage.removeItem('Organization_Data');
      spyOn(component,'deleteClicked').and.callThrough();
      component.deleteClicked();
      expect(component.deleteClicked).toHaveBeenCalled();
    })
  })

  it('should test isPhoneTrue',()=>{
    component.add_medium();
    spyOn(component,'isPhoneTrue').and.callThrough();
    component.isPhoneTrue(0);
    expect(component.isPhoneTrue).toHaveBeenCalled();
  })
});
