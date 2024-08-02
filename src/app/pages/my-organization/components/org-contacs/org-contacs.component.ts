import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { ContactData, OrganizationData } from 'src/app/interfaces/Product';
import { LinkButtonComponent } from 'src/app/pages/shared/cell-renders/link-button/link-button.component';

@Component({
  selector: 'app-org-contacs',
  templateUrl: './org-contacs.component.html',
  styleUrls: ['./org-contacs.component.css']
})
export class OrgContacsComponent implements OnInit, OnChanges {




  constructor() { }

  @Input()contactDetailData!:OrganizationData;


  isActiveForm:boolean = false;
  rowData:ContactData = {
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

  
  gridOptions!:GridOptions;
  
  ngOnInit(): void {
    this.gridOptions = {
      context:{
        componentParent:this,
        parent:'orgContacts'
      }
    }
  }
  ngOnChanges(): void {
    if(this.contactDetailData){
      this.isActiveForm = false;
    }
  }

  onRowClick(data:ContactData) {
    this.rowData = data;
  }

  closeSideForm() {
    this.isActiveForm = false;
  }

    
  onNameClick() {
    this.isActiveForm = true;
  }

  colDefsTable: ColDef[] = [
    { headerCheckboxSelection: true, checkboxSelection: true, maxWidth: 30, },
    {
      headerName: 'Name',
      field: 'firstName',
      cellRenderer: LinkButtonComponent,
      // cellRendererParams: {
      //   onOrgClick: this.onRendererNameClick.bind(this),
      // },
    },
    { headerName: 'Role', field: 'role' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Phone', field: 'phone' },
  ];


  // onRendererNameClick(params: any) {
  //   // this.open_contactDetail(params.data, params.data.organization);
  //   this.rowData = params.data;
  //   this.isActiveForm = true;
  // }

  onContactChecked(data:any){
    if(!data.length){
      this.rowData = this.rowData;
      return;
    }
    this.rowData = data.pop();
    this.isActiveForm = true;
  }

}
