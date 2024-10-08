import { Injectable } from '@angular/core';
import { StandardTableProducts } from '../interfaces/TableProducts';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() { }

  inputEditParams = new Subject<any>();

  // setInputEditParams(data:any){
  //   this.inputEditParams.next(data);
  // }


  getLocalListData(){
    return JSON.parse(localStorage.getItem('LocalList_Data') || '[]');
  }

  setLocalListData(data:StandardTableProducts[]){
    localStorage.setItem('LocalList_Data', JSON.stringify(data));
  }

  getStandardListData(){
    return JSON.parse(localStorage.getItem('StandardList_Data') || '[]');
  }

  setStandardListData(data:StandardTableProducts[]){
    localStorage.setItem('StandardList_Data',JSON.stringify(data))
  }


  standard_table_data:StandardTableProducts[] = [
    {
      "is_table_exist": false,
      "table_id": {
        "value": 821,
        "is_edit": false,
        "type": "integer"
      },
      "table_type": {
        "value": "is_standard",
        "is_edit": false,
        "type": "boolean"
      },
      "table_name": {
        "value": "Configuration Item",
        "is_edit": true,
        "type": "char"
      },
      "description": {
        "value": "Configuration Items",
        "is_edit": true,
        "type": "char"
      },
      "attribute_count": {
        "value": 7,
        "is_edit": false,
        "type": "integer"
      },
      "rows_count": {
        "value": 5,
        "is_edit": false,
        "type": "integer"
      },
      "created_on": {
        "value": "23/06/2023",
        "is_edit": false,
        "type": "datetime"
      },
      "created_by": {
        "value": "Shivank Tyagi",
        "is_edit": false,
        "type": "many2one"
      },
      "updated_on": {
        "value": "23/06/2023",
        "is_edit": false,
        "type": "datetime"
      },
      "updated_by": {
        "value": "Shivank Tyagi",
        "is_edit": false,
        "type": "many2one"
      },
      "is_standard": {
        "value": true,
        "is_edit": false,
        "type": "boolean"
      },
      "is_active": {
        "value": true,
        "is_edit": false,
        "type": "boolean"
      },
      "property": {
        "is_edit": true,
        "is_delete": true
      },
      "related_table": [
        {
          "id": 96,
          "name": "Users"
        },
        {
          "id": 96,
          "name": "Users"
        }
      ]
    },
    {
      "is_table_exist": false,
      "table_id": {
        "value": 825,
        "is_edit": false,
        "type": "integer"
      },
      "table_type": {
        "value": "is_standard",
        "is_edit": false,
        "type": "boolean"
      },
      "table_name": {
        "value": "Configuration Group",
        "is_edit": true,
        "type": "char"
      },
      "description": {
        "value": "Variant Configuration Group",
        "is_edit": true,
        "type": "char"
      },
      "attribute_count": {
        "value": 6,
        "is_edit": false,
        "type": "integer"
      },
      "rows_count": {
        "value": 0,
        "is_edit": false,
        "type": "integer"
      },
      "created_on": {
        "value": "26/08/2023",
        "is_edit": false,
        "type": "datetime"
      },
      "created_by": {
        "value": "Gaurav Rautela",
        "is_edit": false,
        "type": "many2one"
      },
      "updated_on": {
        "value": "26/08/2023",
        "is_edit": false,
        "type": "datetime"
      },
      "updated_by": {
        "value": "",
        "is_edit": false,
        "type": "many2one"
      },
      "is_standard": {
        "value": true,
        "is_edit": false,
        "type": "boolean"
      },
      "is_active": {
        "value": true,
        "is_edit": false,
        "type": "boolean"
      },
      "property": {
        "is_edit": true,
        "is_delete": true
      },
      "related_table": [
        {
          "id": 96,
          "name": "Users"
        },
        {
          "id": 96,
          "name": "Users"
        }
      ]
    },
    
    {
      "is_table_exist": false,
      "table_id": {
        "value": 827,
        "is_edit": false,
        "type": "integer"
      },
      "table_type": {
        "value": "is_standard",
        "is_edit": false,
        "type": "boolean"
      },
      "table_name": {
        "value": "Product",
        "is_edit": true,
        "type": "char"
      },
      "description": {
        "value": "Products & Services",
        "is_edit": true,
        "type": "char"
      },
      "attribute_count": {
        "value": 6,
        "is_edit": false,
        "type": "integer"
      },
      "rows_count": {
        "value": 0,
        "is_edit": false,
        "type": "integer"
      },
      "created_on": {
        "value": "26/08/2023",
        "is_edit": false,
        "type": "datetime"
      },
      "created_by": {
        "value": "Gaurav Rautela",
        "is_edit": false,
        "type": "many2one"
      },
      "updated_on": {
        "value": "26/08/2023",
        "is_edit": false,
        "type": "datetime"
      },
      "updated_by": {
        "value": "",
        "is_edit": false,
        "type": "many2one"
      },
      "is_standard": {
        "value": true,
        "is_edit": false,
        "type": "boolean"
      },
      "is_active": {
        "value": true,
        "is_edit": false,
        "type": "boolean"
      },
      "property": {
        "is_edit": true,
        "is_delete": true
      },
      "related_table": [
        {
          "id": 96,
          "name": "Users"
        },
        {
          "id": 96,
          "name": "Users"
        }
      ]
    },
    {
      "is_table_exist": false,
      "table_id": {
        "value": 809,
        "is_edit": false,
        "type": "integer"
      },
      "table_type": {
        "value": "is_standard",
        "is_edit": false,
        "type": "boolean"
      },
      "table_name": {
        "value": "Variant",
        "is_edit": true,
        "type": "char"
      },
      "description": {
        "value": "Product Variant",
        "is_edit": true,
        "type": "char"
      },
      "attribute_count": {
        "value": 11,
        "is_edit": false,
        "type": "integer"
      },
      "rows_count": {
        "value": 5,
        "is_edit": false,
        "type": "integer"
      },
      "created_on": {
        "value": "08/06/2023",
        "is_edit": false,
        "type": "datetime"
      },
      "created_by": {
        "value": "",
        "is_edit": false,
        "type": "many2one"
      },
      "updated_on": {
        "value": "26/06/2023",
        "is_edit": false,
        "type": "datetime"
      },
      "updated_by": {
        "value": "",
        "is_edit": false,
        "type": "many2one"
      },
      "is_standard": {
        "value": true,
        "is_edit": false,
        "type": "boolean"
      },
      "is_active": {
        "value": true,
        "is_edit": false,
        "type": "boolean"
      },
      "property": {
        "is_edit": true,
        "is_delete": true
      },
      "related_table": [
        {
          "id": 791,
          "name": "Product Family Category "
        },
        {
          "id": 793,
          "name": "Product "
        },
        {
          "id": 789,
          "name": "Product Family Type "
        }
      ]
    },
    {
      "is_table_exist": false,
      "table_id": {
        "value": 830,
        "is_edit": false,
        "type": "integer"
      },
      "table_type": {
        "value": "is_standard",
        "is_edit": false,
        "type": "boolean"
      },
      "table_name": {
        "value": "Product Family Type",
        "is_edit": true,
        "type": "char"
      },
      "description": {
        "value": "Product Family Type",
        "is_edit": true,
        "type": "char"
      },
      "attribute_count": {
        "value": 7,
        "is_edit": false,
        "type": "integer"
      },
      "rows_count": {
        "value": 0,
        "is_edit": false,
        "type": "integer"
      },
      "created_on": {
        "value": "26/08/2023",
        "is_edit": false,
        "type": "datetime"
      },
      "created_by": {
        "value": "Gaurav Rautela",
        "is_edit": false,
        "type": "many2one"
      },
      "updated_on": {
        "value": "26/08/2023",
        "is_edit": false,
        "type": "datetime"
      },
      "updated_by": {
        "value": "",
        "is_edit": false,
        "type": "many2one"
      },
      "is_standard": {
        "value": true,
        "is_edit": false,
        "type": "boolean"
      },
      "is_active": {
        "value": true,
        "is_edit": false,
        "type": "boolean"
      },
      "property": {
        "is_edit": true,
        "is_delete": true
      },
      "related_table": [
        {
          "id": 96,
          "name": "Users"
        },
        {
          "id": 96,
          "name": "Users"
        }
      ]
    },
    {
      "is_table_exist": false,
      "table_id": {
        "value": 832,
        "is_edit": false,
        "type": "integer"
      },
      "table_type": {
        "value": "is_standard",
        "is_edit": false,
        "type": "boolean"
      },
      "table_name": {
        "value": "Product Family Category",
        "is_edit": true,
        "type": "char"
      },
      "description": {
        "value": "Product Family Category",
        "is_edit": true,
        "type": "char"
      },
      "attribute_count": {
        "value": 6,
        "is_edit": false,
        "type": "integer"
      },
      "rows_count": {
        "value": 0,
        "is_edit": false,
        "type": "integer"
      },
      "created_on": {
        "value": "26/08/2023",
        "is_edit": false,
        "type": "datetime"
      },
      "created_by": {
        "value": "Gaurav Rautela",
        "is_edit": false,
        "type": "many2one"
      },
      "updated_on": {
        "value": "26/08/2023",
        "is_edit": false,
        "type": "datetime"
      },
      "updated_by": {
        "value": "",
        "is_edit": false,
        "type": "many2one"
      },
      "is_standard": {
        "value": true,
        "is_edit": false,
        "type": "boolean"
      },
      "is_active": {
        "value": true,
        "is_edit": false,
        "type": "boolean"
      },
      "property": {
        "is_edit": true,
        "is_delete": true
      },
      "related_table": [
        {
          "id": 96,
          "name": "Users"
        },
        {
          "id": 96,
          "name": "Users"
        }
      ]
    },
    
    
    {
      "is_table_exist": false,
      "table_id": {
        "value": 838,
        "is_edit": false,
        "type": "integer"
      },
      "table_type": {
        "value": "is_standard",
        "is_edit": false,
        "type": "boolean"
      },
      "table_name": {
        "value": "Service Component Config Option",
        "is_edit": true,
        "type": "char"
      },
      "description": {
        "value": "Service Component Config Option",
        "is_edit": true,
        "type": "char"
      },
      "attribute_count": {
        "value": 7,
        "is_edit": false,
        "type": "integer"
      },
      "rows_count": {
        "value": 0,
        "is_edit": false,
        "type": "integer"
      },
      "created_on": {
        "value": "26/08/2023",
        "is_edit": false,
        "type": "datetime"
      },
      "created_by": {
        "value": "Gaurav Rautela",
        "is_edit": false,
        "type": "many2one"
      },
      "updated_on": {
        "value": "26/08/2023",
        "is_edit": false,
        "type": "datetime"
      },
      "updated_by": {
        "value": "Gaurav Rautela",
        "is_edit": false,
        "type": "many2one"
      },
      "is_standard": {
        "value": true,
        "is_edit": false,
        "type": "boolean"
      },
      "is_active": {
        "value": true,
        "is_edit": false,
        "type": "boolean"
      },
      "property": {
        "is_edit": true,
        "is_delete": true
      },
      "related_table": [
        {
          "id": 96,
          "name": "Users"
        },
        {
          "id": 96,
          "name": "Users"
        }
      ]
    }
    
  ];

  // second page - product table list
  localTableList:StandardTableProducts[] = [
    {
      table_id: {
        value: 838,
        is_edit: false,
        type: 'integer',
      },
      table_type: {
        value: 'is_standard',
        is_edit: false,
        type: 'boolean',
      },
      table_name: {
        value: 'Service Component Config Option',
        is_edit: true,
        type: 'char',
      },
      description: {
        value: 'Service Component Config Option',
        is_edit: true,
        type: 'char',
      },
      attribute_count: {
        value: 7,
        is_edit: false,
        type: 'integer',
      },
      rows_count: {
        value: 0,
        is_edit: false,
        type: 'integer',
      },
      created_on: {
        value: '26/08/2023',
        is_edit: false,
        type: 'datetime',
      },
      created_by: {
        value: 'Gaurav Rautela',
        is_edit: false,
        type: 'many2one',
      },
      updated_on: {
        value: '26/08/2023',
        is_edit: false,
        type: 'datetime',
      },
      updated_by: {
        value: 'Gaurav Rautela',
        is_edit: false,
        type: 'many2one',
      },
      is_standard: {
        value: true,
        is_edit: false,
        type: 'boolean',
      },
      is_active: {
        value: true,
        is_edit: false,
        type: 'boolean',
      },
      property: {
        is_edit: true,
        is_delete: true,
      },
      related_table: [
        {
          id: 96,
          name: 'Users',
        },
        {
          id: 96,
          name: 'Users',
        },
      ],
    },
    {
      table_id: {
        value: 836,
        is_edit: false,
        type: 'integer',
      },
      table_type: {
        value: 'is_standard',
        is_edit: false,
        type: 'boolean',
      },
      table_name: {
        value: 'Config Option test',
        is_edit: true,
        type: 'char',
      },
      description: {
        value: 'Config Options',
        is_edit: true,
        type: 'char',
      },
      attribute_count: {
        value: 7,
        is_edit: false,
        type: 'integer',
      },
      rows_count: {
        value: 0,
        is_edit: false,
        type: 'integer',
      },
      created_on: {
        value: '26/08/2023',
        is_edit: false,
        type: 'datetime',
      },
      created_by: {
        value: 'Gaurav Rautela',
        is_edit: false,
        type: 'many2one',
      },
      updated_on: {
        value: '13/06/2024',
        is_edit: false,
        type: 'datetime',
      },
      updated_by: {
        value: 'Tinku Sharma',
        is_edit: false,
        type: 'many2one',
      },
      is_standard: {
        value: true,
        is_edit: false,
        type: 'boolean',
      },
      is_active: {
        value: true,
        is_edit: false,
        type: 'boolean',
      },
      property: {
        is_edit: true,
        is_delete: true,
      },
      related_table: [
        {
          id: 96,
          name: 'Users',
        },
        {
          id: 799,
          name: 'Config  Items ',
        },
        {
          id: 96,
          name: 'Users',
        },
      ],
    },
    {
      table_id: {
        value: 834,
        is_edit: false,
        type: 'integer',
      },
      table_type: {
        value: 'is_standard',
        is_edit: false,
        type: 'boolean',
      },
      table_name: {
        value: 'Variant Config',
        is_edit: true,
        type: 'char',
      },
      description: {
        value: 'Variant Config Group',
        is_edit: true,
        type: 'char',
      },
      attribute_count: {
        value: 6,
        is_edit: false,
        type: 'integer',
      },
      rows_count: {
        value: 0,
        is_edit: false,
        type: 'integer',
      },
      created_on: {
        value: '26/08/2023',
        is_edit: false,
        type: 'datetime',
      },
      created_by: {
        value: 'Gaurav Rautela',
        is_edit: false,
        type: 'many2one',
      },
      updated_on: {
        value: '13/06/2024',
        is_edit: false,
        type: 'datetime',
      },
      updated_by: {
        value: 'Tinku Sharma',
        is_edit: false,
        type: 'many2one',
      },
      is_standard: {
        value: true,
        is_edit: false,
        type: 'boolean',
      },
      is_active: {
        value: true,
        is_edit: false,
        type: 'boolean',
      },
      property: {
        is_edit: true,
        is_delete: true,
      },
      related_table: [
        {
          id: 96,
          name: 'Users',
        },
        {
          id: 96,
          name: 'Users',
        },
      ],
    },
    {
      table_id: {
        value: 832,
        is_edit: false,
        type: 'integer',
      },
      table_type: {
        value: 'is_standard',
        is_edit: false,
        type: 'boolean',
      },
      table_name: {
        value: 'Product Family Category',
        is_edit: true,
        type: 'char',
      },
      description: {
        value: 'Product Family Category',
        is_edit: true,
        type: 'char',
      },
      attribute_count: {
        value: 6,
        is_edit: false,
        type: 'integer',
      },
      rows_count: {
        value: 0,
        is_edit: false,
        type: 'integer',
      },
      created_on: {
        value: '26/08/2023',
        is_edit: false,
        type: 'datetime',
      },
      created_by: {
        value: 'Gaurav Rautela',
        is_edit: false,
        type: 'many2one',
      },
      updated_on: {
        value: '26/08/2023',
        is_edit: false,
        type: 'datetime',
      },
      updated_by: {
        value: '',
        is_edit: false,
        type: 'many2one',
      },
      is_standard: {
        value: true,
        is_edit: false,
        type: 'boolean',
      },
      is_active: {
        value: true,
        is_edit: false,
        type: 'boolean',
      },
      property: {
        is_edit: true,
        is_delete: true,
      },
      related_table: [
        {
          id: 96,
          name: 'Users',
        },
        {
          id: 96,
          name: 'Users',
        },
      ],
    },
    {
      table_id: {
        value: 830,
        is_edit: false,
        type: 'integer',
      },
      table_type: {
        value: 'is_standard',
        is_edit: false,
        type: 'boolean',
      },
      table_name: {
        value: 'Product Family Type',
        is_edit: true,
        type: 'char',
      },
      description: {
        value: 'Product Family Type',
        is_edit: true,
        type: 'char',
      },
      attribute_count: {
        value: 7,
        is_edit: false,
        type: 'integer',
      },
      rows_count: {
        value: 0,
        is_edit: false,
        type: 'integer',
      },
      created_on: {
        value: '26/08/2023',
        is_edit: false,
        type: 'datetime',
      },
      created_by: {
        value: 'Gaurav Rautela',
        is_edit: false,
        type: 'many2one',
      },
      updated_on: {
        value: '26/08/2023',
        is_edit: false,
        type: 'datetime',
      },
      updated_by: {
        value: '',
        is_edit: false,
        type: 'many2one',
      },
      is_standard: {
        value: true,
        is_edit: false,
        type: 'boolean',
      },
      is_active: {
        value: true,
        is_edit: false,
        type: 'boolean',
      },
      property: {
        is_edit: true,
        is_delete: true,
      },
      related_table: [
        {
          id: 96,
          name: 'Users',
        },
        {
          id: 96,
          name: 'Users',
        },
      ],
    },
    {
      table_id: {
        value: 827,
        is_edit: false,
        type: 'integer',
      },
      table_type: {
        value: 'is_standard',
        is_edit: false,
        type: 'boolean',
      },
      table_name: {
        value: 'Product',
        is_edit: true,
        type: 'char',
      },
      description: {
        value: 'Products & Services',
        is_edit: true,
        type: 'char',
      },
      attribute_count: {
        value: 6,
        is_edit: false,
        type: 'integer',
      },
      rows_count: {
        value: 0,
        is_edit: false,
        type: 'integer',
      },
      created_on: {
        value: '26/08/2023',
        is_edit: false,
        type: 'datetime',
      },
      created_by: {
        value: 'Gaurav Rautela',
        is_edit: false,
        type: 'many2one',
      },
      updated_on: {
        value: '26/08/2023',
        is_edit: false,
        type: 'datetime',
      },
      updated_by: {
        value: '',
        is_edit: false,
        type: 'many2one',
      },
      is_standard: {
        value: true,
        is_edit: false,
        type: 'boolean',
      },
      is_active: {
        value: true,
        is_edit: false,
        type: 'boolean',
      },
      property: {
        is_edit: true,
        is_delete: true,
      },
      related_table: [
        {
          id: 96,
          name: 'Users',
        },
        {
          id: 96,
          name: 'Users',
        },
      ],
    },
    {
      table_id: {
        value: 825,
        is_edit: false,
        type: 'integer',
      },
      table_type: {
        value: 'is_standard',
        is_edit: false,
        type: 'boolean',
      },
      table_name: {
        value: 'Configuration Group',
        is_edit: true,
        type: 'char',
      },
      description: {
        value: 'Variant Configuration Group',
        is_edit: true,
        type: 'char',
      },
      attribute_count: {
        value: 6,
        is_edit: false,
        type: 'integer',
      },
      rows_count: {
        value: 0,
        is_edit: false,
        type: 'integer',
      },
      created_on: {
        value: '26/08/2023',
        is_edit: false,
        type: 'datetime',
      },
      created_by: {
        value: 'Gaurav Rautela',
        is_edit: false,
        type: 'many2one',
      },
      updated_on: {
        value: '26/08/2023',
        is_edit: false,
        type: 'datetime',
      },
      updated_by: {
        value: '',
        is_edit: false,
        type: 'many2one',
      },
      is_standard: {
        value: true,
        is_edit: false,
        type: 'boolean',
      },
      is_active: {
        value: true,
        is_edit: false,
        type: 'boolean',
      },
      property: {
        is_edit: true,
        is_delete: true,
      },
      related_table: [
        {
          id: 96,
          name: 'Users',
        },
        {
          id: 96,
          name: 'Users',
        },
      ],
    },
    {
      table_id: {
        value: 821,
        is_edit: false,
        type: 'integer',
      },
      table_type: {
        value: 'is_standard',
        is_edit: false,
        type: 'boolean',
      },
      table_name: {
        value: 'Configuration Item',
        is_edit: true,
        type: 'char',
      },
      description: {
        value: 'Configuration Items',
        is_edit: true,
        type: 'char',
      },
      attribute_count: {
        value: 7,
        is_edit: false,
        type: 'integer',
      },
      rows_count: {
        value: 5,
        is_edit: false,
        type: 'integer',
      },
      created_on: {
        value: '23/06/2023',
        is_edit: false,
        type: 'datetime',
      },
      created_by: {
        value: 'Shivank Tyagi',
        is_edit: false,
        type: 'many2one',
      },
      updated_on: {
        value: '23/06/2023',
        is_edit: false,
        type: 'datetime',
      },
      updated_by: {
        value: 'Shivank Tyagi',
        is_edit: false,
        type: 'many2one',
      },
      is_standard: {
        value: true,
        is_edit: false,
        type: 'boolean',
      },
      is_active: {
        value: true,
        is_edit: false,
        type: 'boolean',
      },
      property: {
        is_edit: true,
        is_delete: true,
      },
      related_table: [
        {
          id: 96,
          name: 'Users',
        },
        {
          id: 96,
          name: 'Users',
        },
      ],
    },
    {
      table_id: {
        value: 818,
        is_edit: false,
        type: 'integer',
      },
      table_type: {
        value: 'is_standard',
        is_edit: false,
        type: 'boolean',
      },
      table_name: {
        value: 'test table new',
        is_edit: true,
        type: 'char',
      },
      description: {
        value: 'Test Table',
        is_edit: true,
        type: 'char',
      },
      attribute_count: {
        value: 7,
        is_edit: false,
        type: 'integer',
      },
      rows_count: {
        value: 12,
        is_edit: false,
        type: 'integer',
      },
      created_on: {
        value: '13/06/2023',
        is_edit: false,
        type: 'datetime',
      },
      created_by: {
        value: 'Administrator',
        is_edit: false,
        type: 'many2one',
      },
      updated_on: {
        value: '13/06/2023',
        is_edit: false,
        type: 'datetime',
      },
      updated_by: {
        value: '',
        is_edit: false,
        type: 'many2one',
      },
      is_standard: {
        value: true,
        is_edit: false,
        type: 'boolean',
      },
      is_active: {
        value: true,
        is_edit: false,
        type: 'boolean',
      },
      property: {
        is_edit: true,
        is_delete: true,
      },
      related_table: [
        {
          id: 96,
          name: 'Users',
        },
        {
          id: 96,
          name: 'Users',
        },
      ],
    },
    {
      table_id: {
        value: 809,
        is_edit: false,
        type: 'integer',
      },
      table_type: {
        value: 'is_standard',
        is_edit: false,
        type: 'boolean',
      },
      table_name: {
        value: 'Variant',
        is_edit: true,
        type: 'char',
      },
      description: {
        value: 'Product Variant',
        is_edit: true,
        type: 'char',
      },
      attribute_count: {
        value: 11,
        is_edit: false,
        type: 'integer',
      },
      rows_count: {
        value: 5,
        is_edit: false,
        type: 'integer',
      },
      created_on: {
        value: '08/06/2023',
        is_edit: false,
        type: 'datetime',
      },
      created_by: {
        value: '',
        is_edit: false,
        type: 'many2one',
      },
      updated_on: {
        value: '26/06/2023',
        is_edit: false,
        type: 'datetime',
      },
      updated_by: {
        value: '',
        is_edit: false,
        type: 'many2one',
      },
      is_standard: {
        value: true,
        is_edit: false,
        type: 'boolean',
      },
      is_active: {
        value: true,
        is_edit: false,
        type: 'boolean',
      },
      property: {
        is_edit: true,
        is_delete: true,
      },
      related_table: [
        {
          id: 791,
          name: 'Product Family Category ',
        },
        {
          id: 793,
          name: 'Product ',
        },
        {
          id: 789,
          name: 'Product Family Type ',
        },
      ],
    },
  ];
}
