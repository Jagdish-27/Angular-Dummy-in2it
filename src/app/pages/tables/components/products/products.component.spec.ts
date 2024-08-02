import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsService } from 'src/app/services/products.service';
import { GridOptions } from 'ag-grid-community';


describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    let productServiceSpy = jasmine.createSpyObj('ProductsService', [
      'getStandardListData','getLocalListData','setStandardListData','setLocalListData'
    ]);
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: ProductsService, useValue: productServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();

    productService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;

    component.gridOptions = {
      context: {
        componentParent: {
          standardTableData: [],
        },
      },
    } as GridOptions;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isPanel property', () => {
    expect(component.isPanel).toBeFalse();

    component.showHidePanel();
    expect(component.isPanel).toBeTrue();

    component.showHidePanel();
    expect(component.isPanel).toBeFalse();
  });

  describe('selectedTableListDataFunc', () => {
    it('should test selectedTableListData', () => {
      let mockData = [
        {
          is_table_exist: false,
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
      ];
      component.standardTableData = mockData;

      component.selectedTableListData(mockData);

      expect(component.checkedTableData).toEqual(mockData);
    });

    it('should set enable btn to true', () => {
      let data:[] = [];

      component.selectedTableListData(data);
      expect(component.enableDisableIsAddList).toBeTrue();
    });
  });

  describe('onNgOnInitMethodRun', () => {
    it('should set standardTableList gridOptions and addListBtn', () => {
      let mockData = [
        {
          is_table_exist: false,
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
      ];
      productService.getStandardListData.and.returnValue(mockData);
      component.ngOnInit();

      expect(component.standardTableData).toEqual(mockData);
      expect(component.gridOptions).toBeDefined();
      expect(component.gridOptions).toEqual(
        jasmine.objectContaining({
          context: { componentParent: component, parent: 'products' },
        })
      );
    });
  });

  describe('AddSelectedList',()=>{

    it('should add selected data to list',()=>{
      let mockData = [
        {
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
      
      component.checkedTableData = mockData;

      productService.getLocalListData.and.returnValue(mockData);
      productService.getStandardListData.and.returnValue(mockData);

      
      component.AddSelectedList()
      expect(component.checkedTableData).toBeTruthy();
    })

  })

  describe('Value Formatter', () => {
    it('should format boolean true to "Yes"', () => {

      const formatedObj:any = component.colDef[3]; 

      const formattedValue:any = formatedObj.valueFormatter({value:true})
      
      expect(formattedValue).toBe('Yes');
    });
  
    it('should format boolean false to "No"', () => {
      
      const formatedObj:any = component.colDef[3]; 

      const formattedValue:any = formatedObj.valueFormatter({value:false})
      
      expect(formattedValue).toBe('No');
    });
  });
  
});
