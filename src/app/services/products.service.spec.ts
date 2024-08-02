import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getLocalTableListData', () => {
    it('should return and empty array if local storage is empty', () => {
      
      spyOn(localStorage,'getItem').and.returnValue(null);
      const result = service.getLocalListData();
      expect(result).toEqual([]);
    });

    it('should parse and return data from local storage', () => {
      let testData = [
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
      ];

      spyOn(localStorage,'getItem').and.returnValue(JSON.stringify(testData));

      const result = service.getLocalListData();
      expect(result).toEqual(testData);
    });
  });

  describe('setLocalListData',()=>{
    it('should set the localListData to the localStorage',()=>{
      let testData = [
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
      ];

      // spyOn(localStorage,'setItem').and.returnValue(testData as any);

      service.setLocalListData(testData);

      const result = service.getLocalListData();

      expect(result).toEqual(testData)
    })
  })

  describe('getStandardTableListData', () => {
    it('should return and empty array if local storage is empty', () => {
      
      spyOn(localStorage,'getItem').and.returnValue(null);
      const result = service.getStandardListData();
      expect(result).toEqual([]);
    });

    it('should parse and return data from local storage', () => {
      let testData = [
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
      ];

      spyOn(localStorage,'getItem').and.returnValue(JSON.stringify(testData));

      const result = service.getStandardListData();
      expect(result).toEqual(testData);
    });
  });

  describe('setStandardTableListData',()=>{
    it('should set the localListData to the localStorage',()=>{
      let testData = [
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
      ];

      // spyOn(localStorage,'setItem').and.returnValue(testData as any);

      service.setStandardListData(testData);

      const result = service.getStandardListData();

      expect(result).toEqual(testData)
    })
  })
});
