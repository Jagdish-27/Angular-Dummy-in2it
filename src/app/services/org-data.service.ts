import { Injectable } from '@angular/core';
import { OrganizationData } from '../interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class OrgDataService {

  constructor() { }

  getOrgData(){
    return JSON.parse(localStorage.getItem('Organization_Data') || '[]');
  }

  setOrgDataToLocal(data:OrganizationData){
    localStorage.setItem('Organization_Data', JSON.stringify(data));
  }
 
}
