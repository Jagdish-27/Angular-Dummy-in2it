export interface Product {
  id: number;
  name: string;
}

export interface Nav_List_Data {
  settings: string[];
  my_menu: string[];
  my_organization: string[];
  designer: string[];
}

export interface HeaderTitleSubject {
  link: string;
  module: string;
}

export interface OrganizationData {
  id: number;
  organization: string;
  type: string;
  industry: string;
  onboarding: string;
  relatedOrgs: string[];
  orgSPOC: string;
  
  parentOrganizations: string[];
  registrationNumber: string;
  description: string;
  cluster: string;
  tier: string;
  address: string;
  products: string[];
  contacs: ContactData[];
}


export interface ContactData {
  id:number,
  firstName:string;
  lastName:string;
  email: string;
  role: string;
  phone: string;
  phone_code:string;
  additional_role:string;
  remarks:string;
  other_medium:string[];
}

export interface CountryCodeData{
  id:number;
  name:string;
  code:string;
  limit_min:string;
  limit_max:string;
  phone_code:string;
  currency_id:number;
  currency_name:string;
}
