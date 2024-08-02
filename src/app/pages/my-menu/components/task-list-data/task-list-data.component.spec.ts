import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListDataComponent } from './task-list-data.component';

describe('TaskListDataComponent', () => {
  let component: TaskListDataComponent;
  let fixture: ComponentFixture<TaskListDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskListDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test onDataListUpdate',()=>{
    let mockData = {id:1,name:'rohit'}
    component.onDataListUpdate(mockData);
    expect(component.tableData[0]).toEqual(mockData);
  })

  it('should test toggleSideForm',()=>{
    component.toggleSideForm();
    expect(component.toggleSideForm).toBeDefined();
    expect(component.item).toBeNull()
  })

  it('should test deleteUser',()=>{
    component.deleteUser(1);
    expect(component.deleteUser).toBeDefined();
  })

  it('should test editItem',()=>{
    let mockData = {id:1,name:'rohit'}
    component.editItem(mockData,0);
    expect(component.editItem).toBeDefined();
  })

  it('should test updatedData',()=>{
    let mockData = {id:1,name:'rohit'};
    component.updatedData(mockData);
    expect(component.updatedData).toBeDefined();
  })

  it('should test closeForm',()=>{
    component.closeForm('closeForm')
    expect(component.closeForm).toBeDefined();
    expect(component.isSideNavForm_Open).toBeFalse();
  })

  it('should test onOverlayClick',()=>{
    component.onOverlayClick()
    expect(component.isSideNavForm_Open).toBeFalse();
  })

  describe('cellStyle',()=>{
    it('should test colDefs params values low',()=>{
      const params = {value:'low'};
      let existingCol:any = component.colDefsTable[8];
  
      let result = existingCol.cellStyle(params);
  
      expect(result).toEqual({ color: 'white', backgroundColor: 'red' })
    })

    it('should test colDefs params values medium',()=>{
      const params = {value:'medium'};
      let existingCol:any = component.colDefsTable[8];
  
      let result = existingCol.cellStyle(params);
  
      expect(result).toEqual({ color: 'white', backgroundColor: 'blue' })
    })

    it('should test colDefs params values high',()=>{
      const params = {value:'high'};
      let existingCol:any = component.colDefsTable[8];
  
      let result = existingCol.cellStyle(params);
  
      expect(result).toEqual({ color: 'white', backgroundColor: 'green' })
    })

    it('should test for empty string',()=>{
      const params = {value:''};
      let existingCol:any = component.colDefsTable[8];
  
      let result = existingCol.cellStyle(params);
  
      expect(result).toEqual({ color: 'white', backgroundColor: '' })
    })
  })

  
});
