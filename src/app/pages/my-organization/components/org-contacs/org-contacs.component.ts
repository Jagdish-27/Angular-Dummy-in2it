import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ContactData, OrganizationData } from 'src/app/interfaces/Product';

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

  

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
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

}
