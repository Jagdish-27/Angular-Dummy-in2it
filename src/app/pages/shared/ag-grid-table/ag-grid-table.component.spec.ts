import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridTableComponent } from './ag-grid-table.component';

describe('AgGridTableComponent', () => {
  let component: AgGridTableComponent;
  let fixture: ComponentFixture<AgGridTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgGridTableComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should initialize colDefsList and set hide property to false for each item', () => {
      // Arrange
      const mockColumnDefs = [
        { headerName: 'Column 1', hide: true },
        { headerName: 'Column 2', hide: true },
        { headerName: 'Column 3', hide: true }
      ];

      // Set component's columnDefs
      component.columnDefs = mockColumnDefs;

      // Act
      component.colDefsList = component.columnDefs.map((val) => {
        return { ...val, hide: false };
      });

      component.ngOnInit();
      // Assert
      expect(component.colDefsList).toBeDefined();
      expect(component.colDefsList.length).toEqual(mockColumnDefs.length);

      component.colDefsList.forEach((item) => {
        expect(item.hide).toBeFalse();
      });
    });

  })

  it('should set quick filter when searchVal changes', () => {
    // Arrange
    const mockChanges = {
      searchVal: {
        currentValue: 'newSearchValue',
        previousValue: 'oldSearchValue',
        isFirstChange: () => false,
        firstChange: false
      }
    };
    const mockGridApi: any = {
      setQuickFilter: jasmine.createSpy('setQuickFilter')
    };


    // Set component's gridApi
    component.gridApi = mockGridApi;

    // Act
    component.ngOnChanges(mockChanges);

    // Assert
    expect(mockGridApi.setQuickFilter).toHaveBeenCalledWith('');
  });

  it('should test changes object for undefined', () => {
    const mockChanges = {}
    component.ngOnChanges(mockChanges);
    expect(mockChanges).toEqual({});
  })

  describe('showHideCol()', () => {

    it('should hide column when col.hide is false', () => {
      // Arrange
      const mockCol = { field: 'columnName', hide: false };
      const mockColumnApi = {
        setColumnVisible: jasmine.createSpy('setColumnVisible')
      };
      const mockGridOptions: any = {
        columnApi: mockColumnApi
      };

      // Set component's gridOptions
      component.gridOptions = mockGridOptions;

      // Act
      component.showHideCol(mockCol);

      // Assert
      expect(mockColumnApi.setColumnVisible).toHaveBeenCalledWith('columnName', false);
      expect(mockCol.hide).toBeTrue();
    });

    it('should hide column when col.hide is true', () => {
      // Arrange
      const mockCol = { field: 'columnName', hide: true };
      const mockColumnApi = {
        setColumnVisible: jasmine.createSpy('setColumnVisible')
      };
      const mockGridOptions: any = {
        columnApi: mockColumnApi
      };

      // Set component's gridOptions
      component.gridOptions = mockGridOptions;

      // Act
      component.showHideCol(mockCol);

      // Assert
      expect(mockColumnApi.setColumnVisible).toHaveBeenCalledWith('columnName', true);
      expect(mockCol.hide).toBeFalse();
    });
  })

  it('should grid option is undefined for hide true or false', () => {

    const mockCol = { field: 'columnName', hide: true };
    const mockGridOptions: any = {};

    component.gridOptions = mockGridOptions;

    component.showHideCol(mockCol);

    expect(component.gridOptions).toEqual({});

    const mockCol2 = { field: 'columnName', hide: false };
    const mockGridOptions2: any = {};

    component.gridOptions = mockGridOptions2;

    component.showHideCol(mockCol2);

    expect(component.gridOptions).toEqual({});

  })

  it('should test getRowStyle',()=>{
    const mockParams = {
      data: { is_table_exist: true }
    };

    const style = component.getRowStyle(mockParams);

    expect(style).toBeDefined();
  })

  it('should test grid ready',()=>{
    const mockParams = {
      api:{},
    }

    component.gridReady(mockParams);

    expect(component.gridApi).toBeDefined();
  })

  it('should test onPageSizeChanged',()=>{
    let event = {target:{value:'1'}};

    const mockGridApi:any = {
      paginationSetPageSize: jasmine.createSpy('paginationSetPageSize')
    };
  
    // Set component's gridApi
    component.gridApi = mockGridApi;

    component.onPageSizeChanged(event);

    expect(component.paginationPageSize).toBe(1);
    expect(mockGridApi.paginationSetPageSize).toHaveBeenCalledWith(1);
  })

  it('should emit selectedCheckBoxs_id, orgContactCheck, and selectedTableListData events with selected data', () => {
    // Arrange
    const mockSelectedNodes = [
      { data: { id: 1, name: 'Item 1' } },
      { data: { id: 2, name: 'Item 2' } }
    ];
    const mockSelectedData = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' }
    ];
    const mockGridApi:any = {
      getSelectedNodes: jasmine.createSpy('getSelectedNodes').and.returnValue(mockSelectedNodes)
    };
  
    // Mock output event emitters
    spyOn(component.selectedCheckBoxs_id, 'emit');
    spyOn(component.orgContactCheck, 'emit');
    spyOn(component.selectedTableListData, 'emit');
  
    // Set component's gridApi
    component.gridApi = mockGridApi;
  
    // Act
    component.onSelectionChange();
  
    // Assert
    expect(component.selectedCheckBoxs_id.emit).toHaveBeenCalledWith(mockSelectedData);
    expect(component.orgContactCheck.emit).toHaveBeenCalledWith(mockSelectedData);
    expect(component.selectedTableListData.emit).toHaveBeenCalledWith(mockSelectedData);
  });
  
  it('should initialize isRowSelectable function correctly', () => {

    const mockRowNode:any = {
      data: { is_table_exist: true }
    };

    component.ngOnInit();

    // Assert
    expect(component.isRowSelectable(mockRowNode)).toBeFalse();

    // another part 

    const mockRowNode2:any = {
      data: { is_table_exist: false }
    };

    component.ngOnInit();

    // Assert
    expect(component.isRowSelectable(mockRowNode2)).toBeTrue();
  });
});
