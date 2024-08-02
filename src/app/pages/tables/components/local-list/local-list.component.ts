import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { StandardTableProducts } from 'src/app/interfaces/TableProducts';
import { CustomButtonsComponent } from 'src/app/pages/shared/cell-renders/custom-buttons/custom-buttons.component';
import { InputEditComponent } from 'src/app/pages/shared/cell-renders/input-edit/input-edit.component';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-local-list',
  templateUrl: './local-list.component.html',
  styleUrls: ['./local-list.component.css'],
})
export class LocalListComponent implements OnInit {
  constructor(private productService: ProductsService) {}

  localTableList: StandardTableProducts[] = [];

  gridOptions!: GridOptions;

  checkedTableData: StandardTableProducts[] = [];

  isSaveClicked!:boolean;
  isCancelClicked!:boolean;;

  ngOnInit(): void {
    
    // localStorage.setItem('LocalList_Data',JSON.stringify(this.productService.localTableList));

    this.localTableList = this.productService.getLocalListData();
    this.gridOptions = {
      context: {
        componentParent: this,
        parent: 'localList',
        // action:''
      },
    };
  }

  colDef: ColDef[] = [
    { headerName: 'Table Id', field: 'table_id.value' },
    { headerName: 'Table Name', field: 'table_name.value',cellRenderer:InputEditComponent, }, 
    { headerName: 'Table Description', field: 'description.value',cellRenderer:InputEditComponent },
    { headerName: 'Created By', field: 'created_by.value' },
    { headerName: 'Updated On', field: 'updated_on.value' },
    { headerName: 'Created On', field: 'created_on.value' },
    { headerName: 'Updated By', field: 'updated_by.value' },
    { headerName: 'Actions', cellRenderer: CustomButtonsComponent,field:'actions' },
  ];

  isPanel:boolean = false;
  showHidePanel(){
    this.isPanel = !this.isPanel;
  }

  getCurrentDateFormatted() {
    let currentDate = new Date();

    let day:any = currentDate.getDate();
    let month:any = currentDate.getMonth() + 1; 
    let year = currentDate.getFullYear();

    let formattedDate = `${day}/${month}/${year}`;
    
    return formattedDate;
  }

  addNewRow() {

    let id = Math.floor(Math.random() * 900) + 100;
    let currentDate = this.getCurrentDateFormatted();


    let templateObj = {
      "table_id": {
        "value": id,
        "is_edit": false,
        "type": "integer"
      },
      "table_type": {
        "value": "is_standard",
        "is_edit": false,
        "type": "boolean"
      },
      "table_name": {
        "value": "",
        "is_edit": true,
        "type": "char"
      },
      "description": {
        "value": "",
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
        "value": currentDate,
        "is_edit": false,
        "type": "datetime"
      },
      "created_by": {
        "value": "Dummy User",
        "is_edit": false,
        "type": "many2one"
      },
      "updated_on": {
        "value": currentDate,
        "is_edit": false,
        "type": "datetime"
      },
      "updated_by": {
        "value": "Dummy User",
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
    }

    this.gridOptions.context.componentParent.localTableList.unshift(templateObj);
    this.gridOptions.context.componentParent.localTableList[0].isAddMode = true;

    const updated_data = JSON.parse(JSON.stringify(templateObj));
    this.gridOptions.context.componentParent.localTableList[0].updatedData = updated_data;


    this.gridOptions.api?.applyTransaction({ add: [templateObj], addIndex: 0 }); 

  }

  searchVal:string ='';
  searchItem(e:any){
    this.searchVal = e.target.value;
  }
  
}
