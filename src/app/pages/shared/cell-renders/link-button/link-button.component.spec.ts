import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkButtonComponent } from './link-button.component';

describe('LinkButtonComponent', () => {
  let component: LinkButtonComponent;
  let fixture: ComponentFixture<LinkButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkButtonComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('agInit',()=>{
    
    it('should initialize instance variables correctly', () => {
      // Arrange
      const mockParams:any = {
        value: 'Test Label',
        colDef: { field: 'name' },
        data: { organization: 'TestOrg', firstName: 'John' }
      };
    
      // Act
      component.agInit(mockParams);
    
      // Assert
      expect(component.params).toEqual(mockParams);
      expect(component.label).toEqual('Test Label');
      expect(component.fieldName).toEqual('name');
      expect(component.orgName).toEqual('TestOrg');
      expect(component.userName).toEqual('John');
    });
    
    it('should handle undefined colDef and data in params', () => {
      // Arrange
      const mockParams:any = {
        value: 'Test Label',
        colDef: null,
        data: {}
      };
    
      // Act
      component.agInit(mockParams);
    
      // Assert
      expect(component.params).toEqual(mockParams);
      expect(component.label).toEqual('Test Label');
      expect(component.fieldName).toEqual('');
      expect(component.params.data.organization).toBeUndefined();
      expect(component.userName).toBeUndefined();
      
    });
    it('should handle empty value in params', () => {
      // Arrange
      const mockParams:any = {
        value: '',
        colDef: { field: 'name' },
        data: { organization: 'TestOrg', firstName: 'John' }
      };
    
      // Act
      component.agInit(mockParams);
    
      // Assert
      expect(component.params).toEqual(mockParams);
      expect(component.label).toEqual('');
      expect(component.fieldName).toEqual('name');
      expect(component.orgName).toEqual('TestOrg');
      expect(component.userName).toEqual('John');
    });
    
  });

  it('refresh()',()=>{
    const mockParams:any = {
      value: '',
      colDef: { field: 'name' },
      data: { organization: 'TestOrg', firstName: 'John' }
    };
    component.refresh(mockParams);

    expect(component.params).toEqual(mockParams);
  })

 

  it('should call organizationClicked with params.data when parent is "org"', () => {
    // Arrange
    const mockContext = {
      parent: 'org',
      componentParent: {
        organizationClicked: jasmine.createSpy('organizationClicked')
      }
    };
    const mockParams = {
      context: mockContext,
      data: { id: 1, name: 'Test Org' }
    };
  
    // Act
    component.params = mockParams;
    component.onOrgClick();
  
    // Assert
    expect(mockParams.context.componentParent.organizationClicked).toHaveBeenCalledWith(mockParams.data);
  });

 

  it('should call organizationClicked with correct dataToPass when parent is not "org"', () => {
    // Arrange
    const mockFilteredData = [
      { id: 1, orgId: 1, name: 'Org 1' },
      { id: 2, orgId: 2, name: 'Org 2' }
    ];
    const mockContext = {
      parent: 'allContacts',
      componentParent: {
        filteredData: mockFilteredData,
        organizationClicked: jasmine.createSpy('organizationClicked')
      }
    };
    const mockParams = {
      context: mockContext,
      data: { orgId: 2 }
    };
  
    // Act
    component.params = mockParams;
    component.onOrgClick();
  
    // Assert
    expect(mockParams.context.componentParent.organizationClicked).toHaveBeenCalledWith(mockFilteredData[1]);
  });
  
  it('should call open_contactDetail with params.data when parent is allContacts',()=>{
    const mockContext = {
      parent:'allContacts',
      componentParent:{
        open_contactDetail:jasmine.createSpy('open_contactDetail')
      }
    };

    const mockParams = {
      context:mockContext,
      data:{id:1,name:'Test contact'}
    }

    component.params = mockParams;
    component.onNameClick();
  })


  it('should set rowData and isActiveForm to true when parent is not "allContacts"', () => {
    // Arrange
    const mockParams = {
      context: {
        parent: 'org',
        componentParent: {
          rowData: { id: 1, name: 'John Doe' },
          isActiveForm: false
        }
      },
      data: { id: 1, name: 'John Doe' }
    };
  
    // Act
    component.params = mockParams;
    component.onNameClick();
  
    // Assert
    expect(mockParams.context.componentParent.rowData).toEqual(mockParams.data);
    expect(mockParams.context.componentParent.isActiveForm).toBeTrue();
  });
  
});
