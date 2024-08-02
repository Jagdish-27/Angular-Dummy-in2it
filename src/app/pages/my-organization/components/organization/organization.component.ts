import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizationData } from 'src/app/interfaces/Product';
import { OrgDataService } from 'src/app/services/org-data.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {


  constructor(private serverService:ServerService, private orgService:OrgDataService,private route:ActivatedRoute) { }

  customerCount:number=0;
  nonCustomerCount:number =0;
  
  totalItems!:number;
  filteredData:OrganizationData[] = [];

  emitedItem!:OrganizationData;
  currentActiveVal:string='';

  searchObjList = [
    {
      name:'Customer',
    },
    {
      name:'Non Customer',
    }
  ]
  searchObjListFiltered:any = [];

  ngOnInit(): void {
    this.route.url.subscribe((url)=>{
      this.serverService.setHeadTitle({link:url[0].path,module:'My Organization'});
    })
    this.setDataInitialy(); 
    this.serverService.setCurrentTabId(0);
    
    // localStorage.setItem('Organization_Data',JSON.stringify(this.serverService.rowData));
  }

  setDataInitialy(){
    this.customerCount = this.serverService.rowData.filter(data => data.type === "Customer").length;
    this.nonCustomerCount = this.serverService.rowData.filter(data => data.type === "Non Customer").length;
    this.totalItems = this.orgService.getOrgData().length; // 
    this.filteredData = [...this.orgService.getOrgData()];
    this.searchObjListFiltered = this.searchObjList;
  } 

  onSideBarSearchValue(event:any){
    this.searchObjListFiltered = this.sideSearchFilter(event.target.value);
  }

  sideSearchFilter(val:string){
    if(!val){
      return [...this.searchObjList];
    }

    val = val.toLowerCase();
    return this.searchObjList.filter((data:any)=>{
      return (
        data.name.toLowerCase().includes(val)
      )
    })
  }
  
  filterOrganization(value: string) {
    this.currentActiveVal = value;
    if (value === 'Customer') {
      this.filteredData = this.serverService.rowData.filter((data) => data.type === 'Customer');
    } else if (value === 'Non Customer') {
      this.filteredData = this.serverService.rowData.filter((data) => data.type === 'Non Customer');
    } else {
      this.filteredData = this.serverService.rowData;
    }
  }
  
  onSearchValue(event: any) {
    this.filteredData = this.filterOrgData(event.target.value);
  }

  filterOrgData(searchValue:string):any[]{
    if(!searchValue){
      return [...this.serverService.rowData];
    };
    searchValue = searchValue.toLowerCase();
    return this.serverService.rowData.filter((data:OrganizationData)=>{
      return(
        data.organization.toLowerCase().includes(searchValue)  || data.industry.toLowerCase().includes(searchValue) ||  data.onboarding.toLowerCase().includes(searchValue) ||  data.orgSPOC.toLowerCase().includes(searchValue) || data.type.toLowerCase().includes(searchValue) || data.contacs.some((contact)=>contact.phone.toLowerCase().includes(searchValue)) || data.contacs.some((contact)=>contact.email.toLowerCase().includes(searchValue))
      )
    })
  }

  organizationClicked(data: OrganizationData) {
      // this.emitedItem = data;
      this.serverService.setOrgData(data);
      this.serverService.setCurrentTabId(data.id);
  }
}