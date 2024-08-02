import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomButtonsComponent } from './custom-buttons.component';

describe('CustomButtonsComponent', () => {
  let component: CustomButtonsComponent;
  let fixture: ComponentFixture<CustomButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomButtonsComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('agInit()',()=>{
    const mockParams:any = {};

    component.agInit(mockParams);

    expect(component.params).toEqual(mockParams);
  })

  it('should call refresh()',()=>{
    const mockParams:any = {};

    const result = component.refresh(mockParams);

    expect(result).toBeTrue();
  })

  it('should call onClickEdit with params.data when parent is "tasks"',()=>{

    const mockContext = {
      parent:'tasks',
      componentParent:{
        editItem: jasmine.createSpy('editItem'),
        isEditable:false,
      }
    }

    const mockParams:any = {
      context:mockContext,
      data:{id:1,name:'rohit'},
      rowIndex:0
    }
    
    component.params = mockParams;
    component.onClickEdit();

    expect(mockParams.context.componentParent.editItem).toHaveBeenCalledWith(mockParams.data,mockParams.rowIndex);
    expect(mockParams.context.componentParent.isEditable).toBeTrue();
  })

  it('should call onClickEdit with params.data when parent is not "tasks"',()=>{
    const mockContext = {
      parent:'localList',
    }

    const mockParams:any = {
      context:mockContext,
      data:{id:1,name:'mohit',isEditing:false},
    }

    component.params = mockParams;
    component.onClickEdit();
    

    expect(component.isEditable).toBeTrue();
  })

  describe('onSaveStopEditing',()=>{
    
    it('should update data and localStorage when isAddMode is false', () => {
      // Arrange
      const mockData = {
        isAddMode: false,
        isEditing: true,
        table_name: { value: 'Old Table Name' },
        description: { value: 'Old Description' },
        updatedData: {
          table_name: { value: 'New Table Name' },
          description: { value: 'New Description' }
        }
      };
      const mockContext = {
        componentParent: {
          localTableList: [mockData]
        }
      };
      const mockParams:any = {
        data: mockData,
        context: mockContext
      };
    
      spyOn(localStorage, 'setItem');
    
      // Act
      component.params = mockParams;
      component.onSaveStopEditing();
    
      // Assert
      expect(component.isEditable).toBeFalse();
      expect(mockParams.data.isEditing).toBeUndefined();
      expect(mockParams.data.table_name.value).toEqual('New Table Name');
      expect(mockParams.data.description.value).toEqual('New Description');
      expect(mockParams.data.isAddMode).toBeFalse();
      expect(mockParams.data.updatedData).toBeUndefined();
    
      expect(localStorage.setItem).toHaveBeenCalledWith('LocalList_Data', JSON.stringify([mockData]));
    });

    it('should update data and localStorage when isAddMode is true', () => {
      // Arrange
      const mockData = {
        isAddMode: true,
        table_name: { value: 'Old Table Name' },
        description: { value: 'Old Description' },
        updatedData: {
          table_name: { value: 'New Table Name' },
          description: { value: 'New Description' }
        }
      };
      const mockContext = {
        componentParent: {
          localTableList: [mockData]
        }
      };
      const mockParams:any = {
        data: mockData,
        context: mockContext
      };
    
      spyOn(localStorage, 'setItem');
    
      // Act
      component.params = mockParams;
      component.onSaveStopEditing();
    
      // Assert
      expect(component.isEditable).toBeFalse();
      expect(mockParams.data.isAddMode).toBeUndefined();
      expect(mockParams.data.table_name.value).toEqual('New Table Name');
      expect(mockParams.data.description.value).toEqual('New Description');
      expect(mockParams.data.updatedData).toBeUndefined();
    
      const filteredData = mockParams.context.componentParent.localTableList.filter((val: { isAddMode: any; }) => !val.isAddMode);
      expect(localStorage.setItem).toHaveBeenCalledWith('LocalList_Data', JSON.stringify(filteredData));
    });
  })

  it('should reset state and cleanup data on cancel click', () => {
    // Arrange
    const mockData = {
      isEditing: true,
      updatedData: {
        table_name: { value: 'New Table Name' },
        description: { value: 'New Description' }
      }
    };
    const mockContext = {
      action: 'cancel'
    };
    const mockParams:any = {
      data: mockData,
      context: mockContext
    };

   
  
    // Act
    component.params = mockParams;
    component.onCancelClick();
  
    // Assert
    expect(component.isEditable).toBeFalse();
    expect(mockParams.data.isEditing).toBeFalse();
    expect(mockParams.context.action).toEqual('cancel');
    expect(mockParams.data.updatedData).toBeUndefined();
  });

  it('should apply transaction to remove data', () => {
    // Arrange
    const mockData = { id: 1, name: 'Test Data' };
    const mockApi = {
      applyTransaction: jasmine.createSpy('applyTransaction')
    };
    const mockParams:any = {
      api: mockApi,
      data: mockData
    };
  
    // Act
    component.params = mockParams;
    component.onRemoveClick();
  
    // Assert
    expect(mockApi.applyTransaction).toHaveBeenCalledWith({ remove: [mockData] });
  });
  
  
  describe('deleteUser()',()=>{
    it('should call deleteUser method on componentParent when parentComponent is "tasks"', () => {
      // Arrange
      const mockData = { id: 1, name: 'Test User' };
      const mockContext = {
        parent: 'tasks',
        componentParent: {
          deleteUser: jasmine.createSpy('deleteUser')
        }
      };
      const mockParams:any = {
        context: mockContext,
        data: mockData
      };
    
      // Act
      component.params = mockParams;
      component.deleteUser();
    
      // Assert
      expect(mockParams.context.componentParent.deleteUser).toHaveBeenCalledWith(mockData.id);
    });
    

    it('should apply transaction, update local and standard lists, and update localStorageItems', () => {
      
      const mockData = {
        table_id: { value: 1 },
        is_table_exist: false
      };
      const mockContext = {
        parent:'localList',
        componentParent:{
          deleteUser:jasmine.createSpy('deleteUser'),
          localTableList:mockData
        }
      }

      const mockApi = {
        applyTransaction: jasmine.createSpy('applyTransaction')
      };

      const mockParams:any = {
        api:mockApi,
        context:mockContext,
        data:mockData
      }
      
      localStorage.setItem('StandardList_Data',JSON.stringify([mockData]));
      localStorage.setItem('LocalList_Data',JSON.stringify([mockData]));

      component.params = mockParams;
      component.deleteUser();

      expect(mockApi.applyTransaction).toHaveBeenCalledWith({remove:[mockData]})
      
    });
    
  })
});
