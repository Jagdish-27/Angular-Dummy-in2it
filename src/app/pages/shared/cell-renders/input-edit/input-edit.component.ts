import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-input-edit',
  templateUrl: './input-edit.component.html',
  styleUrls: ['./input-edit.component.css'],
})
export class InputEditComponent {

  params: any;
  // label!: string;

  fieldName!: string;
  isEditingCell: boolean = false;

  value!: string;


  agInit(param: ICellRendererParams): void {
    this.params = param;
    this.fieldName = param.colDef?.field ?? '';
    this.value =
      this.fieldName == 'table_name.value'
        ? param.data.table_name.value
        : param.data.description.value;
  }

  refresh(_params: any): boolean {
    return true;
  }
}
