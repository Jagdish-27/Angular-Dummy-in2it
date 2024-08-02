import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { OverlayService } from 'src/app/services/overlay.service';
import { ServerService } from 'src/app/services/server.service';
import { CustomButtonsComponent } from 'src/app/pages/shared/cell-renders/custom-buttons/custom-buttons.component';

@Component({
  selector: 'app-task-list-data',
  templateUrl: './task-list-data.component.html',
  styleUrls: ['./task-list-data.component.css'],
})
export class TaskListDataComponent implements OnInit {
  constructor(
    private server: ServerService,
    public overlayService: OverlayService
  ) {}

  api!: GridApi;
  gridOptions!:GridOptions


  currentPage: number = 1;
  itemsPerPage: number = 5;

  isSideNavForm_Open: boolean = false;
  tableData: any[] = [];
  onListDataChange!: boolean;
  reset: boolean = false;

  item: any;
  itemIndex!: number;

  isEditable: boolean = false;

  ngOnInit(): void {
    this.tableData = this.server.getUser_Data();
    this.gridOptions={
      context:{
        componentParent: this,
        parent: 'tasks'
      }
    }
  }

  onDataListUpdate(data: any) {
    this.server.setData(data);
    this.tableData = this.server.getUser_Data();
  }

  toggleSideForm() {
    this.item = null;
    this.reset = true;
    this.isSideNavForm_Open = true;
    // this.overlayService.openOverlay();
    this.isEditable = false;
  }

  deleteUser(id: number) {
    const permit = confirm('Do you really want to delete?');
    if (permit) {
      this.tableData = this.tableData.filter((value) => value.id !== id);
      localStorage.setItem('taskFormData', JSON.stringify(this.tableData));
    }
  }

  editItem(data: any, i: number) {
    this.isSideNavForm_Open = true;
    this.item = data;
    this.itemIndex = i;
    this.isEditable = true;
    // this.overlayService.openOverlay();
  }

  updatedData(data: any) {
    this.tableData = this.server.editData(data);
    this.isSideNavForm_Open = false;
  }

  closeForm(event: string) {
    if (event == 'closeForm') {
      this.item = null;
      this.isSideNavForm_Open = false;
    }
  }

  onOverlayClick() {
    this.item = null;
    this.isSideNavForm_Open = false;
    // this.overlayService.closeOverlay();
  }

  colDefsTable: ColDef[] = [
    { field: 'id' },
    { field: 'solutionArea' },
    { field: 'workflow' },
    { field: 'taskId' },
    { field: 'task' },
    { field: 'status' },
    { field: 'startDate' },
    { field: 'dueDate' },
    {
      field: 'priority',
      cellStyle: (params) => ({
        color: 'white',
        backgroundColor:
          params.value == 'low'
            ? 'red'
            : params.value == 'high'
            ? 'green'
            : params.value == 'medium'
            ? 'blue'
            : '',
      }),
    },
    {
      headerName: 'Actions',
      cellRenderer: CustomButtonsComponent,
    },
  ];
  // onDeleteBtnClick(params: any) {
  //   this.deleteUser(params.data.id);
  // }
  // onEditButtonClick(params: any) {
  //   this.editItem(params.data, params.rowIndex);
  //   // this.api.startEditingCell({
  //   //   rowIndex: params.rowIndex,
  //   //   colKey: 'solutionArea'
  //   // });
  // }
}
