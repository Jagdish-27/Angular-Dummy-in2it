import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ColDef, GridOptions } from 'ag-grid-community';
import {
  ContactData,
  CountryCodeData,
  OrganizationData,
} from 'src/app/interfaces/Product';
import { LinkButtonComponent } from 'src/app/pages/shared/cell-renders/link-button/link-button.component';
import { ContactService } from 'src/app/services/contact.service';
import { OrgDataService } from 'src/app/services/org-data.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  constructor(
    private orgService: OrgDataService,
    private serverService: ServerService,
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService,
    private fb: FormBuilder
  ) {}

  currentActiveVal: string = 'all';
  isActiveForm: boolean = false;

  totalItems!: number;
  filteredData: OrganizationData[] = [];

  allContacts: any;

  listContactsData: OrganizationData[] = [];

  countryCodeList: CountryCodeData[] = [];
  currentActiveRole: any;

  isContactDetailOpen: boolean = false;
  isEditingContact: boolean = false;

  roleList = [
    'Admin',
    'Manager',
    'Assistant',
    'Coordinator',
    'Sales Representative',
    'Marketing Specialist',
    'Account Manager',
  ];

  otherList = [
    { name: 'Facebook' },
    { name: 'Linkdin' },
    { name: 'Whatsapp' },
    { name: 'Twitter' },
    { name: 'Pintrest' },
    { name: 'Phone' },
    { name: 'Email' },
  ];

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
    other_medium: [],
  };

  allOrgAndContacts: any;

  filterAllOrgAndContacts: any;

  gridOptions!: GridOptions;

  ngOnInit(): void {
    this.countryCodeList = this.contactService.country_Code;

    // localStorage.setItem('tabs', JSON.stringify([]));
    this.route.url.subscribe((url) => {
      this.serverService.setHeadTitle({
        link: url[0].path,
        module: 'My Organization',
      });
    });

    this.setDataInitialy();
    this.gridOptions = {
      context: {
        componentParent: this,
        parent: 'allContacts',
      },
    };

    // this.serverService.setCurrentTabId(0);
    // this.router.navigate(['my-organization/contact']);
  }

  setDataInitialy() {
    this.listContactsData = this.orgService.getOrgData();
    this.filteredData = [...this.listContactsData];

    this.allContacts = this.filteredData.reduce((prev: any, curr: any) => {
      prev.push(...curr.contacs);
      return prev;
    }, []);

    // Updated code for ag-grid..

    this.allOrgAndContacts = this.filteredData.reduce(
      (prev: any, curr: any) => {
        curr.contacs.map((contact: any) => {
          let modifiedContact = {
            ...contact,
            organization: curr.organization,
            orgId: curr.id,
          };
          prev.push(modifiedContact);
        });

        return prev;
      },
      []
    );
    this.filterAllOrgAndContacts = [...this.allOrgAndContacts];
  }

  selected_contact_data: any = [];

  selectedContactsIds(e: any) {
    this.selected_contact_data = e;
  }

  filterContacs(value: string) {
    this.currentActiveVal = value;
    if (this.currentActiveVal !== 'all') {
      this.currentActiveRole = false;
      this.contact_form.controls['organization'].patchValue(
        this.currentActiveVal
      );
      this.contact_form.controls['organization'].disable();
      this.selected_contact_data = [];
    } else {
      this.contact_form.controls['organization'].enable();
      this.contact_form.controls['organization'].patchValue('');

      this.selected_contact_data = [];
    }
    this.isActiveForm = false;

    if (this.currentActiveVal == 'all') {
      this.selected_contact_data = [];
      this.filteredData = this.listContactsData;
      // updated data for agGrid
      this.filterAllOrgAndContacts = this.allOrgAndContacts;
    } else {
      this.filteredData = this.listContactsData.filter(
        (data) => data.organization === this.currentActiveVal
      );
      const isAdminExist = this.filteredData.map(({ contacs }) =>
        contacs.some((value) => value.role == 'Admin')
      );
      this.currentActiveRole = isAdminExist[0];
      // updated data for ag grid
      this.filterAllOrgAndContacts = this.allOrgAndContacts.filter(
        (data: { organization: string }) =>
          data.organization === this.currentActiveVal
      );
    }
    this.isEditingContact = false;
  }

  organizationClicked(data: OrganizationData) {
    this.serverService.setOrgData(data);
    this.serverService.setCurrentTabId(data.id);
    this.router.navigate(['my-organization/organization/detail']);
  }

  // contact forms configration

  contact_form = this.fb.group({
    id: [],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    organization: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone_code: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.maxLength(10)]],
    role: ['', [Validators.required]],
    additional_role: [''],
    remarks: [''],
    other_medium: this.fb.array([]),
  });

  get other_medium_array() {
    return this.contact_form.get('other_medium') as FormArray;
  }

  onMediumSelect(event: any, i: number) {
    let selectedMedium = event.value;
    if (selectedMedium === 'Phone') {
      this.other_medium_array.setControl(
        i,
        this.fb.group({
          phone_code_other: [''],
          medium: ['Phone'],
          detail: [''],
        })
      );
    }
  }

  isPhoneTrue(i: number) {
    return this.other_medium_array.at(i).get('medium')?.value == 'Phone';
  }
  add_medium() {
    this.other_medium_array.push(
      this.fb.group({
        medium: [''],
        detail: [''],
      })
    );
  }

  remove_medium(index: number) {
    this.other_medium_array.removeAt(index);
  }

  onSubmit() {
    if (this.contact_form.valid) {
      const selectedOrganization =
        this.contact_form.controls['organization'].value;

      let localStorageItems = JSON.parse(
        localStorage.getItem('Organization_Data') || '[]'
      );

      if (!this.isEditingContact) {
        var id = parseInt(Math.random().toString(16).slice(2), 16);
        const form_Data = { ...this.contact_form.value, id: id };
        const organization = localStorageItems.find(
          (value: { organization: string }) =>
            value.organization === selectedOrganization
        ) as OrganizationData;

        if (organization) {
          organization.contacs.unshift(form_Data);
        }

        this.orgService.setOrgDataToLocal(localStorageItems);

        this.filteredData = localStorageItems;

        this.allContacts = this.filteredData.reduce((prev: any, curr: any) => {
          prev.push(...curr.contacs);
          return prev;
        }, []);

        // updated code for ag grid...
        this.allOrgAndContacts = this.filteredData.reduce(
          (prev: any, curr: any) => {
            curr.contacs.map((contact: any) => {
              let modifiedContact = {
                ...contact,
                organization: curr.organization,
                orgId: curr.id,
              };
              prev.push(modifiedContact);
            });

            return prev;
          },
          []
        );

        this.listContactsData = this.filteredData;

        this.filterContacs(selectedOrganization);
      } else {
        this.isEditingContact = false;

        const organization = localStorageItems.find(
          (value: { organization: string }) =>
            value.organization === selectedOrganization
        ) as OrganizationData;

        const index = organization.contacs.findIndex(
          (item) => item.id === this.contact_form.controls['id'].value
        );

        if (index !== -1) {
          organization.contacs.splice(index, 1, this.contact_form.value);
          this.orgService.setOrgDataToLocal(localStorageItems);
        }

        this.filteredData = localStorageItems;

        this.allContacts = this.filteredData.reduce((prev: any, curr: any) => {
          prev.push(...curr.contacs);
          return prev;
        }, []);

        // updated code for ag grid...
        this.allOrgAndContacts = this.filteredData.reduce(
          (prev: any, curr: any) => {
            curr.contacs.map((contact: any) => {
              let modifiedContact = {
                ...contact,
                organization: curr.organization,
                orgId: curr.id,
              };
              prev.push(modifiedContact);
            });

            return prev;
          },
          []
        );

        this.listContactsData = this.filteredData;

        this.filterContacs(selectedOrganization);
      }

      this.isActiveForm = false;
      this.contact_form.reset();
      this.contact_form.patchValue({ organization: selectedOrganization });
    } else {
      let key = Object.keys(this.contact_form.controls);

      key.map((val) => {
        let control =
          this.contact_form.controls[
            val as keyof typeof this.contact_form.controls
          ];
        if (control.errors) {
          control.markAsTouched();
        }
      });
    }
  }

  onOrgSelectChange(event: any) {
    let selectValue = event.target.value;
    // this.currentActiveVal = !selectValue ? 'all' : selectValue;
    if (this.currentActiveVal == 'all') {
      this.filteredData = this.listContactsData;
    } else {
      this.filteredData = this.listContactsData.filter(
        (data) => data.organization === this.currentActiveVal
      );
    }

    if (selectValue) {
      this.contact_form.controls['role'].patchValue('');
    }

    let findObje = this.filteredData.filter(
      (value) => value.organization === selectValue
    );

    const isAdminExist = findObje.map(({ contacs }) =>
      contacs.some((contact) => contact.role == 'Admin')
    );

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
      });

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
    });

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
          this.rowData.other_medium.forEach((data) => {
            const group = this.fb.group({
              phone_code_other: [],
              medium: [],
              detail: [],
            });

            Object.keys(group.controls).forEach((key) => {
              group.patchValue({
                [key]: data[key as any],
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

        this.filteredData = this.listContactsData.filter(
          (data) => data.organization === this.contactAssociateOrg
        );
        const isAdminExist = this.filteredData.map(({ contacs }) =>
          contacs.some((value) => value.role == 'Admin')
        );
        this.currentActiveRole = isAdminExist[0];

        if (this.rowData.role == 'Admin') {
          this.contact_form.controls['role'].enable();
          this.currentActiveRole = false;
        }
        this.contact_form.controls['organization'].disable();

        this.filterAllOrgAndContacts = this.allOrgAndContacts.filter(
          (data: { organization: any }) =>
            data.organization === this.contactAssociateOrg
        );
      }
    } else {
      const { checkedContactId, currentOrg } = newObj;
      // this.currentActiveVal = currentOrg;

      const contactToEdit = this.allContacts.filter(
        (value: any) => value.id === checkedContactId
      )[0] as ContactData;

      if (contactToEdit.other_medium.length > 0) {
        this.other_medium_array.clear();
        contactToEdit.other_medium.forEach((data) => {
          const group = this.fb.group({
            phone_code_other: [],
            medium: [],
            detail: [],
          });

          Object.keys(group.controls).forEach((key) => {
            group.patchValue({
              [key]: data[key as any],
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

      this.filteredData = this.listContactsData.filter(
        (data) => data.organization === currentOrg
      );
      const isAdminExist = this.filteredData.map(({ contacs }) =>
        contacs.some((value) => value.role == 'Admin')
      );
      this.currentActiveRole = isAdminExist[0];

      if (contactToEdit.role == 'Admin') {
        this.contact_form.controls['role'].enable();
        this.currentActiveRole = false;
      }
      this.contact_form.controls['organization'].disable();
    }
  }

  editTopButtonClick() {
    const checkedContactId = this.selected_contact_data.map(
      (data: { id: any }) => data.id
    )[0];

    let currentOrg = this.selected_contact_data.map(
      (data: { organization: any }) => data.organization
    )[0];

    if (!currentOrg) currentOrg = this.currentActiveVal;
    const myObj = { checkedContactId, currentOrg };

    this.contactAssociateOrg = currentOrg;

    this.onEditButtonClick(myObj);
  }

  deleteClicked() {
    const checkedContactIds = this.selected_contact_data.map(
      (data: { id: any }) => data.id
    );
    const selectedOrgContacts = this.selected_contact_data.map(
      (data: { organization: any }) => data.organization
    );

    let localStorageItems = JSON.parse(
      localStorage.getItem('Organization_Data') || '[]'
    );

    selectedOrgContacts.forEach((currentOrg: string) => {
      const organizationIndex = localStorageItems.findIndex(
        (item: { organization: string }) => item.organization === currentOrg
      );

      if (organizationIndex !== -1) {
        const organization = localStorageItems[
          organizationIndex
        ] as OrganizationData;

        checkedContactIds.forEach((checkedContactId: number) => {
          organization.contacs = organization.contacs.filter(
            (item) => item.id !== checkedContactId
          );
        });

        this.orgService.setOrgDataToLocal(localStorageItems);
      }
    });

    this.filteredData = localStorageItems;

    this.allContacts = this.filteredData.reduce((prev: any, curr: any) => {
      prev.push(...curr.contacs);
      return prev;
    }, []);

    this.filterAllOrgAndContacts = this.filteredData.reduce(
      (prev: any, curr: any) => {
        curr.contacs.map((contact: any) => {
          let modifiedContact = {
            ...contact,
            organization: curr.organization,
            orgId: curr.id,
          };
          prev.push(modifiedContact);
        });

        return prev;
      },
      []
    );

    this.listContactsData = this.filteredData;

    this.filterContacs(this.currentActiveVal);
    this.selected_contact_data = [];
  }

  // side bar search

  onSearchValue(event: any) {
    this.listContactsData = this.filterOrgData(event.target.value);
  }

  filterOrgData(searchValue: string): any[] {
    if (!searchValue) {
      return [...this.orgService.getOrgData()];
    }
    searchValue = searchValue.toLowerCase();
    return this.orgService.getOrgData().filter((data: OrganizationData) => {
      return data.organization.toLowerCase().includes(searchValue);
    });
  }

  onSearchValueContacts(event: any) {
    this.filterAllOrgAndContacts = this.filterOrgDataContacts(
      event.target.value
    );
  }

  // ag grid code

  filterOrgDataContacts(searchValue: string): any {
    if (!searchValue) {
      return [...this.allOrgAndContacts];
    }
    searchValue = searchValue.toLowerCase();

    return this.allOrgAndContacts.filter((data: any) => {
      return (
        data.organization.toLowerCase().includes(searchValue) ||
        data.firstName.toLowerCase().includes(searchValue) ||
        data.role.toLowerCase().includes(searchValue) ||
        data.email.toLowerCase().includes(searchValue) ||
        data.phone.toString().toLowerCase().includes(searchValue)
      );
    });
  }

  colDefsTable: ColDef[] = [
    { headerCheckboxSelection: true, checkboxSelection: true, maxWidth: 30 },
    {
      headerName: 'Organization',
      field: 'organization',
      cellRenderer: LinkButtonComponent,
      filter: 'agTextColumnFilter',

      // cellRendererParams: {
      //   onOrgClick: this.onRendererOrgClick.bind(this),
      // },
    },
    {
      headerName: 'Name',
      field: 'firstName',
      cellRenderer: LinkButtonComponent,
      filter: 'agMultiColumnFilter',
      sortable: true,
      // cellRendererParams: {
      //   onOrgClick: this.onRendererNameClick.bind(this),
      // },
    },
    {
      headerName: 'Role',
      field: 'role',
    },

    { headerName: 'Email', field: 'email' },
    { headerName: 'Phone', field: 'phone' },
  ];

  // onRendererOrgClick(params: any) {
  //   const dataToPass = this.filteredData.find(
  //     (item) => item.id === params.data.orgId
  //   );
  //   this.organizationClicked(dataToPass as OrganizationData);
  // }

  // onRendererNameClick(params: any) {
  //   this.open_contactDetail(params.data, params.data.organization);
  // }
}
