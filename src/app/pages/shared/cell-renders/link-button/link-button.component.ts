import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { OrganizationData } from 'src/app/interfaces/Product';

@Component({
  selector: 'app-link-button',
  templateUrl: './link-button.component.html',
  styleUrls: ['./link-button.component.css']
})
export class LinkButtonComponent {

  constructor() { }

  params:any;
  label!: string;
  orgName!:string;
  userName!:string;
  fieldName!:string;

  agInit(param:ICellRendererParams): void {
    this.params = param;
    this.label = param.value;

    this.fieldName = param.colDef?.field??'';
    this.orgName = param.data.organization;
    this.userName = param.data.firstName;
    
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  onOrgClick(){
    if(this.params.context.parent == 'org'){
      this.params.context.componentParent.organizationClicked(this.params.data);
    }else{
      const dataToPass = this.params.context.componentParent.filteredData.find(
        (item: { id: any; }) => item.id === this.params.data.orgId
      );
      this.params.context.componentParent.organizationClicked(dataToPass as OrganizationData);
    }
  }

  onNameClick(){
    if(this.params.context.parent == 'allContacts'){
      this.params.context.componentParent.open_contactDetail(this.params.data,this.params.data.organization);
    }else{
      this.params.context.componentParent.rowData = this.params.data;
      this.params.context.componentParent.isActiveForm = true;
    }
  }
}
