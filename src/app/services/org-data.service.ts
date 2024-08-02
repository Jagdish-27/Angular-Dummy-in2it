import { Injectable } from '@angular/core';
import { OrganizationData } from '../interfaces/Product';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class OrgDataService {


  org_data: OrganizationData[] = JSON.parse(localStorage.getItem('Organization_Data') || '[]');


  constructor(private serverService:ServerService) { }

  getOrgData(){
    return this.org_data;
  }

  setOrgDataToLocal(data:OrganizationData){
    localStorage.setItem('Organization_Data', JSON.stringify(data));
  }

  saveOrgDataState(): void {
    localStorage.setItem('Organization_Data', JSON.stringify(this.org_data));
  }


  editContactData(data: any) {
    const dataList: any = this.getOrgData();

    const index = dataList.findIndex((item: any) => item.id === data.id);

    if (index !== -1) {
      dataList.splice(index, 1, data);
      localStorage.setItem('Organization_Data', JSON.stringify(dataList) as string);
      return dataList;
    }
  }

  
}
