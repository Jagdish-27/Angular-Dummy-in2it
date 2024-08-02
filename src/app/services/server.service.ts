import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HeaderTitleSubject, OrganizationData } from '../interfaces/Product';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor() {}


  currentTabId = new BehaviorSubject<any>(0);

  setCurrentTabId(id:any){
    this.currentTabId.next(id);
  }

  headerTitleSubject = new BehaviorSubject<HeaderTitleSubject>({
    link: 'My Task',
    module: 'My Menu',
  });

  orgDataSubject = new Subject<OrganizationData>();

  setHeadTitle(data: HeaderTitleSubject) {
    this.headerTitleSubject.next(data);
  }

  setOrgData(data: OrganizationData) {
    this.orgDataSubject.next(data);
  }

  getUser_Data() {
    return JSON.parse(localStorage.getItem('taskFormData') as string) as [];
  }

  setData(data: any) {
    const listData: any[] = this.getUser_Data() || [];
    listData.unshift(data);
    localStorage.setItem('taskFormData', JSON.stringify(listData) as string);
  }

  editData(data: any) {
    const dataList: any = this.getUser_Data();

    const index = dataList.findIndex((item: any) => item.id === data.id);

    if (index !== -1) {
      dataList.splice(index, 1, data);
      localStorage.setItem('taskFormData', JSON.stringify(dataList) as string);
      return dataList;
    }
  }
 
  

  rowData:OrganizationData[] = [
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
    },
    {
        id: 2,
        organization: 'Organization B',
        parentOrganizations: ['Parent Organization C', 'Parent Organization D'],
        type: 'Non Customer',
        industry: 'Industry 2',
        registrationNumber: '0987654321',
        description: 'Description of Organization B',
        cluster: 'Cluster B',
        tier: 'Tier 2',
        address: '456 Elm Street, City, Country',
        onboarding: 'Onboarding B',
        relatedOrgs: ['Related Orgs B','Org B', 'Org None'],
        products: ['Product D', 'Product E'],
        orgSPOC: 'SPOC B',
        
        contacs: [
            {
                id: 20,
                email: 'email2@gmail.com',
                phone: '7894561234',
                role: 'Manager',
                firstName: 'Alice',
                lastName: 'Rathor',
                phone_code: '+97',
                additional_role: 'nothing',
                remarks: 'nothing',
                other_medium: []
            },
            {
                id: 30,
                email: 'email3@gmail.com',
                phone: '9876543210',
                role: 'Assistant',
                firstName: 'Bob',
                lastName: 'Chaudhary',
                phone_code: '+91',
                additional_role: '',
                remarks: '',
                other_medium: []
            },
        ],
    },
    {
        id: 3,
        organization: 'Organization C',
        parentOrganizations: ['Parent Organization E', 'Parent Organization F'],
        type: 'Customer',
        industry: 'Industry 3',
        registrationNumber: '1357924680',
        description: 'Description of Organization C',
        cluster: 'Cluster C',
        tier: 'Tier 1',
        address: '789 Maple Street, City, Country',
        onboarding: 'Onboarding C',
        relatedOrgs: ['Related Orgs C','Org B', 'Org None'],
        products: ['Product F', 'Product G'],
        orgSPOC: 'SPOC C',
        
        contacs: [
            {
                id: 40,
                email: 'email4@gmail.com',
                phone: '1239876543',
                role: 'Coordinator',
                firstName: 'Charlie',
                lastName: 'Path',
                phone_code: '+91',
                additional_role: '',
                remarks: '',
                other_medium: []
            },
        ],
    },
    {
        id: 4,
        organization: 'Organization D',
        parentOrganizations: ['Parent Organization G', 'Parent Organization H'],
        type: 'Non Customer',
        industry: 'Industry 4',
        registrationNumber: '2468013579',
        description: 'Description of Organization D',
        cluster: 'Cluster D',
        tier: 'Tier 2',
        address: '101 Oak Street, City, Country',
        onboarding: 'Onboarding D',
        relatedOrgs: ['Org B', 'Org None'],
        products: ['Product H', 'Product I', 'Product J'],
        orgSPOC: 'SPOC D',
        
        contacs: [
            {
                id: 50,
                email: 'email5@gmail.com',
                phone: '6789012345',
                role: 'Sales Representative',
                firstName: 'David',
                lastName: 'Roy',
                phone_code: '+91',
                additional_role: '',
                remarks: '',
                other_medium: []
            },
            {
                id: 60,
                email: 'email6@gmail.com',
                phone: '8901234567',
                role: 'Marketing Specialist',
                firstName: 'Emma',
                lastName: 'Watson',
                phone_code: '+97',
                additional_role: '',
                remarks: '',
                other_medium: []
            },
        ],
    },
    {
        id: 5,
        organization: 'Organization E',
        parentOrganizations: ['Parent Organization I', 'Parent Organization J'],
        type: 'Customer',
        industry: 'Industry 5',
        registrationNumber: '3692581470',
        description: 'Description of Organization E',
        cluster: 'Cluster E',
        tier: 'Tier 3',
        address: '321 Pine Street, City, Country',
        onboarding: 'Onboarding E',
        relatedOrgs: ['Related Orgs E', 'Org None'],
        products: ['Product K', 'Product L', 'Product M'],
        orgSPOC: 'SPOC E',
        
        contacs: [
            {
                id: 70,
                email: 'email7@gmail.com',
                phone: '9012345678',
                role: 'Account Manager',
                firstName: 'Frank',
                lastName: 'Kohli',
                phone_code: '+91',
                additional_role: '',
                remarks: '',
                other_medium: []
            },
        ],
    },
];


  charts_data = {
  graph: [
      {
          sourceName: "Direct",
          value: 309
      },
      {
          sourceName: 'Cross Sales',
          value: 97
      },
      {
          sourceName: 'Portal Enquiry',
          value: 7
      }
  ],
  certainty: [
    {
        name: 'Extremely High',
        value: 10
    },
      {
          name: 'High',
          value: 32
      },
      {
          name: 'Moderate',
          value: 47
      },
      {
          name: 'Low',
          value: 28
      },
      
      {
          name: 'Almost Lost',
          value: 2
      }
  ],
  sales_ticket_per_owner: [
      {
          user_name: 'Tinku Sharma',
          total_ticket: 89
      },
      {
          user_name: 'Vishal Mishra',
          total_ticket: 3
      },
      {
          user_name: 'Pawna Kumare',
          total_ticket: 19
      },
      {
          user_name: 'Shivank Tyagi',
          total_ticket: 36
      },
      {
          user_name: 'Vikash Tiwari123',
          total_ticket: 6
      },
      {
          user_name: 'Vikash Tiwari',
          total_ticket: 5
      },
      {
          user_name: 'Ankit Tyagi',
          total_ticket: 90
      }
  ],
  sales_request_per_variant: [
      {
          name: 'Bronze',
          count: 18
      },
      {
          name: 'Gold',
          count: 48
      },
      {
          name: 'Silver',
          count: 94
      },
      {
          name: 'Best Effort',
          count: 27
      },
      {
          name: 'Platinum',
          count: 4
      }
  ],
  sales_funnel: [
      {
          name: 'Lead',
          count: 413,
          percentage: 27+'%'
      },
      {
          name: 'Opportunity',
          count: 113,
          percentage: 76+'%'
      },
      {
          name: 'Quotation',
          count: 86,
          percentage: 58+'%'
      },
      {
          name: 'Order',
          count: 50,
          percentage: 0+'%'
      }
  ]
}

}
