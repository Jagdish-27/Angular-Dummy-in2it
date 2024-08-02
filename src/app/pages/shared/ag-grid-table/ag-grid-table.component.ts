import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ColDef, GridApi, GridOptions, RowNode } from 'ag-grid-community';

@Component({
  selector: 'app-ag-grid-table',
  templateUrl: './ag-grid-table.component.html',
  styleUrls: ['./ag-grid-table.component.css'],
})
export class AgGridTableComponent implements OnInit, OnChanges {
  constructor() {}
 

  @Input() rowData: any[] = [];
  @Input() columnDefs: ColDef[] = [];
  @Input() gridOptions!: GridOptions;
  @Input() showColPanel:boolean = false;
  @Input() searchVal:string = '';

  
  @Output() selectedCheckBoxs_id = new EventEmitter<any>();
  @Output() orgContactCheck = new EventEmitter<any>();
  @Output() selectedTableListData = new EventEmitter<any>();


  gridApi!: GridApi;

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
  };

  paginationPageSize = 5;

  isRowSelectable: any;

  colDefsList!:ColDef[];

  ngOnInit(): void {

    this.colDefsList = this.columnDefs;

    this.colDefsList.map((val)=>{
      val.hide = false;
      return val;
    })

    this.isRowSelectable = (rowNode: RowNode) => {
      return rowNode.data.is_table_exist ? false : true;
    };
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['searchVal']?.previousValue !=undefined){
      this.gridApi.setQuickFilter(this.searchVal)
    }
  }
  
  showHideCol(col:any){
    if(!col.hide){
      this.gridOptions.columnApi?.setColumnVisible(col.field, false);
      col.hide = true;
    }else{
      this.gridOptions.columnApi?.setColumnVisible(col.field, true);
      col.hide = false;
    }
  }
  getRowStyle(params: any): any {
    if (params.data.is_table_exist) {
      return { background: 'lightgrey' };
    }
  }

  gridReady(params: any) {
    this.gridApi = params.api;
  }

  onSelectionChange() {
    const selectedNodes = this.gridApi.getSelectedNodes();

    const selectedCheckBoxs = selectedNodes.map((params) => params.data);

    this.selectedCheckBoxs_id.emit(selectedCheckBoxs);
    this.orgContactCheck.emit(selectedCheckBoxs);
    this.selectedTableListData.emit(selectedCheckBoxs);
  }

  onPageSizeChanged(event: any) {
    this.paginationPageSize = Number(event.target.value);
    this.gridApi.paginationSetPageSize(this.paginationPageSize);
  }
 
}
