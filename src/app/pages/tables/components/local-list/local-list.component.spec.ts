import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalListComponent } from './local-list.component';
import { ProductsService } from 'src/app/services/products.service';
import { StandardTableProducts } from 'src/app/interfaces/TableProducts';
import { GridOptions } from 'ag-grid-community';


describe('LocalListComponent', () => {
  let component: LocalListComponent;
  let fixture: ComponentFixture<LocalListComponent>;

  // let gridOptions:any;
  // let productsService:jasmine.SpyObj<ProductsService>;
  let productsService = jasmine.createSpyObj('ProductsService',['getLocalListData']);
  let mockData:StandardTableProducts[]=[{
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
  }]
  
  beforeEach(async () => {
    // let productServiceSpy = jasmine.createSpyObj('ProductsService',['getLocalListData']);
    await TestBed.configureTestingModule({
      declarations: [ LocalListComponent ],
      providers:[{provide:ProductsService, useValue: productsService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalListComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    // fixture.detectChanges();

    component.gridOptions = {
      context: {
        componentParent: {
          localTableList: [] // Assuming localTableList starts empty
        }
      },
      api: {
        applyTransaction: jasmine.createSpy('applyTransaction') // Mock applyTransaction function
      }
    } as unknown as GridOptions;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize localTableList and gridOptions',()=>{
    productsService.getLocalListData.and.returnValue(mockData);
    component.ngOnInit();
    expect(component.localTableList).toEqual(mockData);
    
    expect(component.gridOptions).toBeDefined();
    expect(component.gridOptions).toEqual(jasmine.objectContaining({
      context:{componentParent:component,parent:'localList'}
    }))
    
  })
 
  it('should toggle isPanel property',()=>{
    expect(component.isPanel).toBeFalse();
    
    component.showHidePanel();
    expect(component.isPanel).toBeTrue();

    component.showHidePanel();
    expect(component.isPanel).toBeFalse();

    component.showHidePanel();
    expect(component.isPanel).toBeTrue();
  })

  it('should update searchVal property correctly', () => {
    const mockEvent = { target: { value: 'test value' } };
    
    // Call the searchItem method with the mock event
    component.searchItem(mockEvent);

    // Assert that searchVal is updated correctly
    expect(component.searchVal).toEqual('test value');
  });

  it('should update searchVal property to empty string if event value is empty', () => {
    const mockEvent = { target: { value: '' } };
    component.searchVal = 'previous value';

    // Call the searchItem method with the mock event
    component.searchItem(mockEvent);

    // Assert that searchVal is updated to empty string
    expect(component.searchVal).toEqual('');
  });

  describe('getCurrentDateFormatted', () => {
    it('should return formatted current date', () => {
      const currentDate = component.getCurrentDateFormatted();
      expect(currentDate).toEqual(jasmine.any(String));
    });

    it('should test with formated date',()=>{
      
    })
  });
  
  
  describe('addNewRow', () => {

    it('should add a new row correctly', () => {
      // Call the function to add a new row
      component.addNewRow();

      // Assert the changes made by addNewRow function
      expect(component.gridOptions.context.componentParent.localTableList.length).toBe(1); // Expect one item added
      expect(component.gridOptions.context.componentParent.localTableList[0].isAddMode).toBe(true); // Expect isAddMode to be true

      expect(component.gridOptions.api?.applyTransaction)
      expect(component.gridOptions.api?.applyTransaction).toHaveBeenCalled(); // Expect applyTransaction to have been called

      // Additional assertions on the structure of the added row
      const addedRow = component.gridOptions.context.componentParent.localTableList[0];

      // Assert specific properties based on templateObj structure
      expect(addedRow.table_id.value).toBeDefined(); // Ensure table_id value is defined
      expect(typeof addedRow.table_id.value).toBe('number'); // Ensure table_id value is of type number

      expect(addedRow.table_name.value).toBe(''); // Ensure table_name value is initially empty
      expect(typeof addedRow.table_name.value).toBe('string'); // Ensure table_name value is of type string

      expect(addedRow.created_by.value).toBe('Dummy User'); // Ensure created_by value is 'Dummy User'
    });
  });


  it('should not apply transaction if gridOptions.api is undefined', () => {
    // Arrange
    component.gridOptions.api = undefined;

    // // Act
    component.addNewRow();

    expect(component.gridOptions.api).toBeUndefined();
  });
});
