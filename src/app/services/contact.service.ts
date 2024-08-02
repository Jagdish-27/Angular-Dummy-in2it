import { Injectable } from '@angular/core';
import { CountryCodeData } from '../interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }

  country_Code:CountryCodeData[] = [
    {
        "id": 104,
        "name": "India",
        "code": "IN",
        "limit_min": "10",
        "limit_max": "10",
        "phone_code": "+91",
        "currency_id": 20,
        "currency_name": "INR",
    },
    {
        "id": 247,
        "name": "South Africa",
        "code": "ZA",
        "limit_min": "7",
        "limit_max": "10",
        "phone_code": "+27",
        "currency_id": 38,
        "currency_name": "ZAR",
    }
]
}
