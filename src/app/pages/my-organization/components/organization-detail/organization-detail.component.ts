import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationData } from 'src/app/interfaces/Product';
import { OrgDataService } from 'src/app/services/org-data.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.css']
})
export class OrganizationDetailComponent implements OnInit {

  constructor(private serverService: ServerService, private router: Router,private route:ActivatedRoute,private orgDataService:OrgDataService) { }


  tabId!: number;
  // activeOrgData!: OrganizationData;


  activeOrgData: OrganizationData = {
    id: 0,
    organization: '',
    type: '',
    industry: '',
    onboarding: '',
    relatedOrgs: [''],
    orgSPOC: '',
    parentOrganizations: [''],
    registrationNumber: '',
    description: '',
    cluster: '',
    tier: '',
    address: '',
    products: [''],
    contacs: [{
      email: '',
      phone: '',
      role: '',
      id: 0,
      firstName: '',
      lastName: '',
      phone_code: '',
      additional_role: '',
      remarks: '',
      other_medium: []
    }],
  }

  active = 1;

  ngOnInit(): void {

    this.route.url.subscribe((url)=>{
      this.serverService.setHeadTitle({link:url[0].path,module:'My Organization'});
    })

    
    this.serverService.currentTabId.subscribe((id) => {
      this.tabId = id;

      if (this.tabId == 0) {
        this.router.navigate(['/my-organization/organization']);
      }

      
      if(this.tabId !== 0){
        this.activeOrgData = this.orgDataService.getOrgData().find((data: { id: any; }) => data.id == this.tabId);
      }
    })

  }


}
