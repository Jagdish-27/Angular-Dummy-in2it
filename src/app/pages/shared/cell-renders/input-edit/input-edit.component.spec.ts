import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputEditComponent } from './input-edit.component';

describe('InputEditComponent', () => {
  let component: InputEditComponent;
  let fixture: ComponentFixture<InputEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputEditComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('agInit call',()=>{
    it('should set value to param.data.table_name.value when fieldName is "table_name.value"', () => {
      // Arrange
      const mockParams: any = {
        colDef: { field: 'table_name.value' },
        data: { table_name: { value: 'Table 1' }, description: { value: 'Description 1' } }
      };
    
      // Act
      component.agInit(mockParams);
    
      // Assert
      expect(component.value).toEqual('Table 1');
    });
    
    it('should set value to param.data.description.value when fieldName is not "table_name.value"', () => {
      // Arrange
      const mockParams: any = {
        colDef: { field: 'description.value' },
        data: { table_name: { value: 'Table 2' }, description: { value: 'Description 2' } }
      };
    
      // Act
      component.agInit(mockParams);
    
      // Assert
      expect(component.value).toEqual('Description 2');
    });

    it('should handle undefined or null colDef.field by setting value to undefined or null', () => {
      // Arrange
      const mockParams: any = {
        colDef: null,
        data: { table_name: { value: undefined }, description: { value: undefined } }
      };
    
      // Act
      component.agInit(mockParams);
    
      // Assert
      expect(component.value).toBeUndefined(); // or expect(component.value).toBeNull();
    });
    
    it('should return true when refresh is called', () => {
      const mockParams = {};
    
      const result = component.refresh(mockParams);
    
      expect(result).toBeTrue();
    });
    
  })
});
