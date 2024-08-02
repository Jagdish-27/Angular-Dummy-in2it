import { any } from '@amcharts/amcharts5/.internal/core/util/Array';
import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FastForward } from 'angular-feather/icons';
import { ContactData, CountryCodeData, OrganizationData } from 'src/app/interfaces/Product';
import { ContactService } from 'src/app/services/contact.service';
import { OrgDataService } from 'src/app/services/org-data.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private orgService: OrgDataService, private serverService: ServerService, private router: Router, private route: ActivatedRoute, private contactService: ContactService, private fb: FormBuilder) { }

  currentActiveVal: string = 'all';
  isActiveForm: boolean = false;

  totalItems!: number;
  filteredData: OrganizationData[] = [];



  allContacts: any

  listContactsData: OrganizationData[] = [];

  countryCodeList: CountryCodeData[] = [];
  currentActiveRole: any;

  isContactDetailOpen: boolean = false;
  isEditingContact: boolean = false;


  roleList = ['Admin', 'Manager', 'Assistant', 'Coordinator', 'Sales Representative', 'Marketing Specialist', 'Account Manager']

  otherList = [
    { name: 'Facebook' },
    { name: 'Linkdin' },
    { name: 'Whatsapp' },
    { name: 'Twitter' },
    { name: 'Pintrest' },
  ]

  rowData: ContactData = {
    email: '',
    role: '',
    phone: '',
    id: 0,
    firstName: '',
    lastName: '',
    phone_code: '',
    additional_role: '',
    remarks: '',
    other_medium: []
  }

  ngOnInit(): void {

    this.countryCodeList = this.contactService.country_Code;

    // this.serverService.setCurrentTabId(0);
    localStorage.setItem('tabs', JSON.stringify([]));

    this.route.url.subscribe((url) => {
      this.serverService.setHeadTitle({ link: url[0].path, module: 'My Organization' });
    })

    this.setDataInitialy();
    // this.getPaginatedData();
    // let data =  this.filteredData.reduce((prev:any,curr:any)=>{
    //   prev.push(...curr.contacs);
    //   return prev
    // },[]).slice(1,5)
    // console.log(data);
    
  }


  setDataInitialy() {
    this.listContactsData = this.orgService.getOrgData()
    this.filteredData = [...this.listContactsData];

    this.allContacts = this.filteredData.reduce((prev: any, curr: any) => {
      prev.push(...curr.contacs);
      return prev;
    }, [])
  }




  filterContacs(value: string) {
    this.currentActiveVal = value;
    if (this.currentActiveVal !== 'all') {
      this.currentActiveRole = false;
      this.selectedChecks = false;
      this.contact_form.get('organization')?.patchValue(this.currentActiveVal);
      this.contact_form.get('organization')?.disable();
      this.activeCheckBoxesIds = [];
      this.selectedOrgContact = [];

    } else {
      this.contact_form.get('organization')?.enable();
      this.contact_form.get('organization')?.patchValue('');
      this.activeCheckBoxesIds = [];
      this.selectedOrgContact = [];
      this.selectedChecks = false;
    }
    this.isActiveForm = false;

    if (this.currentActiveVal == 'all') {
      this.activeCheckBoxesIds = [];
      this.selectedOrgContact = [];
      this.filteredData = this.listContactsData;
    } else {
      this.filteredData = this.listContactsData.filter((data) => data.organization === this.currentActiveVal);
      const isAdminExist = this.filteredData.map(({ contacs }) => contacs.some(value => value.role == 'Admin'));
      this.currentActiveRole = isAdminExist[0];
    }
    this.isEditingContact = false;

  }


  organizationClicked(data: OrganizationData) {
    this.serverService.setOrgData(data);
    this.serverService.setCurrentTabId(data.id);
    this.router.navigate(['my-organization/organization/detail'])
  }


  // contact forms configration

  contact_form = this.fb.group({
    id: [],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    organization: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone_code: ['', [Validators.required]],
    phone: ['', [Validators.required,Validators.maxLength(10)]],
    role: ['', [Validators.required]],
    additional_role: [''],
    remarks: [''],
    other_medium: this.fb.array([]),
  })

  
  get other_medium_array() {
    return this.contact_form.get('other_medium') as FormArray;
  }

  add_medium() {
    this.other_medium_array.push(
      this.fb.group({
        medium: ['',], //[Validators.required]
        detail: ['',], //[Validators.required]
      })
    )
  }

  remove_medium(index: number) {
    this.other_medium_array.removeAt(index)
  }

  onSubmit() {

    if (this.contact_form.valid) {

      const selectedOrganization = this.contact_form.get('organization')?.value;

      let localStorageItems = JSON.parse(localStorage.getItem('Organization_Data') || '[]');

      if (!this.isEditingContact) {
        var id = parseInt(Math.random().toString(16).slice(2), 16);
        const form_Data = { ...this.contact_form.value, id: id };
        console.log('form data', form_Data);
        const organization = localStorageItems.find((value: { organization: string; }) => value.organization === selectedOrganization) as OrganizationData

        if (organization) {
          organization.contacs.unshift(form_Data);
        }

        this.orgService.setOrgDataToLocal(localStorageItems);

        this.filteredData = localStorageItems;

        this.allContacts = this.filteredData.reduce((prev: any, curr: any) => {
          prev.push(...curr.contacs);
          return prev;
        }, []);

        this.listContactsData = this.filteredData;

        this.filterContacs(selectedOrganization);
      } else {
        this.isEditingContact = false;

        const organization = localStorageItems.find((value: { organization: string; }) => value.organization === selectedOrganization) as OrganizationData

        const index = organization.contacs.findIndex(item => item.id === this.contact_form.get('id')?.value);

        if (index !== -1) {
          organization.contacs.splice(index, 1, this.contact_form.value);
          this.orgService.setOrgDataToLocal(localStorageItems);
        }

        this.filteredData = localStorageItems;

        this.allContacts = this.filteredData.reduce((prev: any, curr: any) => {
          prev.push(...curr.contacs);
          return prev;
        }, []);

        this.listContactsData = this.filteredData;

        this.filterContacs(selectedOrganization);


      }


      this.isActiveForm = false;
      this.contact_form.reset();
      this.contact_form.patchValue({ organization: selectedOrganization });

    } else {
      let key = Object.keys(this.contact_form.controls)

      key.map(val => {
        let control = this.contact_form.controls[val as keyof typeof this.contact_form.controls]
        if (control.errors) {
          control.markAsTouched()
          // console.log(control.markAllAsTouched())
        }
      })
    }
  }

  onOrgSelectChange(event: any) {
    let selectValue = event.target.value;
    this.currentActiveVal = !selectValue ? 'all' : selectValue
    if (this.currentActiveVal == 'all') {
      this.filteredData = this.listContactsData;
    } else {
      this.filteredData = this.listContactsData.filter((data) => data.organization === this.currentActiveVal);
    }

    if (selectValue) {
      this.contact_form.get('role')?.patchValue('');
    }

    let findObje = this.filteredData.filter(value => value.organization === selectValue);

    const isAdminExist = findObje.map(({ contacs }) => contacs.some(contact => contact.role == 'Admin'));

    this.currentActiveRole = isAdminExist[0];
  }

  onAddClick() {
    this.isContactDetailOpen = false;
    if (!this.isActiveForm) {
      this.isActiveForm = true;
      this.contact_form.patchValue({
        firstName: [],
        lastName: [],
        email: [],
        phone_code: [],
        phone: [],
        role: [],
        additional_role: [],
        remarks: [],
      })

      this.other_medium_array.clear();
    }
  }

  clearFormInfo() {
    this.contact_form.patchValue({
      firstName: [],
      lastName: [],
      email: [],
      phone_code: [],
      phone: [],
      role: [],
      additional_role: [],
      remarks: [],
    })

    this.other_medium_array.clear();
  }

  closeSideForm() {
    this.isActiveForm = false;
    this.isContactDetailOpen = false;
    this.isEditingContact = false;
    this.other_medium_array.clear();
  }

  contactAssociateOrg!: string;
  open_contactDetail(data: ContactData, org: string) {

    if (this.isEditingContact || this.isActiveForm) return;
    this.isContactDetailOpen = true;
    this.rowData = data;
    this.contactAssociateOrg = org;
  }

  onEditButtonClick(newObj?: any) {
    this.isActiveForm = true;
    this.isContactDetailOpen = false;
    this.isEditingContact = true;
    this.other_medium_array.clear();



    if (!newObj) {
      this.currentActiveVal = this.contactAssociateOrg;
      if (this.rowData && this.contactAssociateOrg) {
        if (this.rowData.other_medium.length > 0) {
          this.other_medium_array.clear();
          this.rowData.other_medium.forEach(data => {

            const group = this.fb.group({
              medium: [],
              detail: [],
            })

            Object.keys(group.controls).forEach(key => {
              group.patchValue({
                [key]: data[key as any]
              });
            });

            this.other_medium_array.controls.push(group);
          });
        }


        this.contact_form.patchValue({
          id: this.rowData.id,
          organization: this.contactAssociateOrg,
          firstName: this.rowData.firstName,
          lastName: this.rowData.lastName,
          email: this.rowData.email,
          phone_code: this.rowData.phone_code,
          phone: this.rowData.phone,
          role: this.rowData.role,
          additional_role: this.rowData.additional_role,
          remarks: this.rowData.remarks,
        });

        this.filteredData = this.listContactsData.filter((data) => data.organization === this.contactAssociateOrg);
        const isAdminExist = this.filteredData.map(({ contacs }) => contacs.some(value => value.role == 'Admin'));
        this.currentActiveRole = isAdminExist[0];



        if (this.rowData.role == 'Admin') {
          this.contact_form.get('role')?.enable()
          this.currentActiveRole = false;
        }
        this.contact_form.get('organization')?.disable();
      }
    } else {
      const { checkedContactId, currentOrg } = newObj;
      this.currentActiveVal = currentOrg;
      const contactToEdit = this.allContacts.filter((value: any) => value.id === checkedContactId)[0] as ContactData;

      if (contactToEdit.other_medium.length > 0) {
        this.other_medium_array.clear();
        contactToEdit.other_medium.forEach(data => {

          const group = this.fb.group({
            medium: [],
            detail: [],
          })

          Object.keys(group.controls).forEach(key => {
            group.patchValue({
              [key]: data[key as any]
            });
          });
          this.other_medium_array.controls.push(group);
        });
      }
      this.contact_form.patchValue({
        id: contactToEdit.id,
        organization: currentOrg,
        firstName: contactToEdit.firstName,
        lastName: contactToEdit.lastName,
        email: contactToEdit.email,
        phone_code: contactToEdit.phone_code,
        phone: contactToEdit.phone,
        role: contactToEdit.role,
        additional_role: contactToEdit.additional_role,
        remarks: contactToEdit.remarks,
      });

      this.filteredData = this.listContactsData.filter((data) => data.organization === currentOrg);
      const isAdminExist = this.filteredData.map(({ contacs }) => contacs.some(value => value.role == 'Admin'));
      this.currentActiveRole = isAdminExist[0];

      if (contactToEdit.role == 'Admin') {
        this.contact_form.get('role')?.enable()
        this.currentActiveRole = false;
      }
      this.contact_form.get('organization')?.disable();
    }

  }


  activeCheckBoxesIds: number[] = [];
  selectedOrgContact: string[] = [];

  selectedChecks: boolean = false;

  isCheck(contact_id: number, orgName: string) {
    return this.activeCheckBoxesIds.some(id => id === contact_id);
  }

  selectAllCheckbox() {

    this.selectedChecks = !this.selectedChecks;

    let newContacts:any = [];

    this.filteredData.forEach((element)=>{
      element.contacs.map(val=>newContacts.push(val));
    });

    
    if (this.selectedChecks) this.activeCheckBoxesIds = newContacts.map((val: { id: any; }) => val.id); // allContacts
    else this.activeCheckBoxesIds = [];

    if (this.selectedChecks) this.selectedOrgContact = this.filteredData.map(val => val.organization);
    else this.selectedOrgContact = [];
    console.log('active ids only numbers', this.activeCheckBoxesIds);
    console.log('selected org Contacts', this.selectedOrgContact);
  }

  onCheckboxChange(contact_id: number, orgName: string, event: any) {
    // let newContacts:any = [];

    // this.filteredData.forEach((element)=>{
    //   element.contacs.map(val=>newContacts.push(val));
    // });

    // debugger;
    if (this.activeCheckBoxesIds.length === this.allContacts.length - 1 ) {
      this.selectedChecks = true;
    }

    if (event.checked) {
      // If checkbox is checked, add the item to the arrays
      this.activeCheckBoxesIds.push(contact_id);

      if (!this.selectedOrgContact.includes(orgName)) {
        this.selectedOrgContact.push(orgName);
      }
      console.log('push ids', this.activeCheckBoxesIds.length);
      console.log('org push', this.selectedOrgContact);
    } else {
      // If checkbox is unchecked, remove the item from the arrays
      this.activeCheckBoxesIds = this.activeCheckBoxesIds.filter(id => id !== contact_id);

      const orgIndex = this.selectedOrgContact.indexOf(orgName);
      if (orgIndex !== -1) {
        this.selectedOrgContact.splice(orgIndex, 1);
        this.selectedChecks = false;
        if(!this.selectedOrgContact.length){
          this.selectedOrgContact.push(orgName)
        }
      }
      console.log('id remove', this.activeCheckBoxesIds.length);
      console.log('org remove', this.selectedOrgContact);

    }
  }



  editTopButtonClick() {
    
    const checkedContactId = this.activeCheckBoxesIds.filter(id => id)[0];
    let currentOrg = this.selectedOrgContact.filter(org => org)[0];
    if(!currentOrg) currentOrg = this.currentActiveVal
    console.log('curent org', currentOrg);
    const myObj = { checkedContactId, currentOrg };

    this.contactAssociateOrg = currentOrg;
    this.onEditButtonClick(myObj);

  }

  deleteClicked() {
    const checkedContactIds = this.activeCheckBoxesIds.filter(id => id);
    const selectedOrgContacts = this.selectedOrgContact.filter(org => org);

    let localStorageItems = JSON.parse(localStorage.getItem('Organization_Data') || '[]');

    selectedOrgContacts.forEach(currentOrg => {
      const organizationIndex = localStorageItems.findIndex((item: { organization: string; }) => item.organization === currentOrg);

      if (organizationIndex !== -1) {
        const organization = localStorageItems[organizationIndex] as OrganizationData;

        checkedContactIds.forEach(checkedContactId => {
          organization.contacs = organization.contacs.filter(item => item.id !== checkedContactId);
        });

        this.orgService.setOrgDataToLocal(localStorageItems);
      }
    });

    this.filteredData = localStorageItems;

    this.allContacts = this.filteredData.reduce((prev: any, curr: any) => {
      prev.push(...curr.contacs);
      return prev;
    }, [])

    this.listContactsData = this.filteredData;

    this.selectedOrgContact.forEach(currentOrg => {
      this.filterContacs(currentOrg);
    });
  }

  // side bar search 
  
  onSearchValue(event: any) {
    this.listContactsData = this.filterOrgData(event.target.value);
  }

  filterOrgData(searchValue:string):any[]{
    if(!searchValue){
      return [...this.orgService.getOrgData()];
    };
    searchValue = searchValue.toLowerCase();
    return this.orgService.getOrgData().filter((data:OrganizationData)=>{
      return(
        data.organization.toLowerCase().includes(searchValue)
      )
    })
  }

  onSearchValueContacts(event: any) {
    this.filteredData = this.filterOrgDataContacts(event.target.value);
  }

  filterOrgDataContacts(searchValue: string): any[] {
    if (!searchValue) {
      if(this.currentActiveVal !== 'all') return this.listContactsData.filter((data) => data.organization === this.currentActiveVal);
      else return [...this.orgService.getOrgData()];
    }
  
    searchValue = searchValue.toLowerCase();
    let dataToFilter = this.currentActiveVal !== 'all' ? this.listContactsData.filter((data) => data.organization === this.currentActiveVal):this.orgService.getOrgData();
    
    return dataToFilter.reduce((filteredOrgs: OrganizationData[], org: OrganizationData) => {

      
      const filterOrganization = org.organization.toLowerCase().includes(searchValue);

      if(filterOrganization){
        filteredOrgs.push({
          ...org,
        })
      }

      const filteredContacts = org.contacs.filter(contact =>
        contact.firstName.toLowerCase().includes(searchValue) || contact.role.toLowerCase().includes(searchValue) || contact.email.toLowerCase().includes(searchValue)
      );
  
      if (filteredContacts.length > 0) {
        filteredOrgs.push({
          ...org,
          contacs: filteredContacts
        });
      }
  
      return filteredOrgs;
    }, []);
  }
  

  trackByFnForOrgData(_index:number, item:any) {
    return item.id
  }

  trackByContact(_index:number, item:any){
    return item.id
  }
}
