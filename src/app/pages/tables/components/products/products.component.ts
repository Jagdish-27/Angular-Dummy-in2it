import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColDef, GridOptions } from 'ag-grid-community';
import { StandardTableProducts } from 'src/app/interfaces/TableProducts';
import { ProductsService } from 'src/app/services/products.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private serverService: ServerService
  ) {}

  standardTableData: StandardTableProducts[] = [];
  gridOptions!: GridOptions;
  checkedTableData: StandardTableProducts[] = [];
  enableDisableIsAddList!: boolean;
  isPanel: boolean = false;

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      this.serverService.setHeadTitle({ link: url[0].path, module: 'Tables' });
    });
    // localStorage.setItem('StandardList_Data',JSON.stringify(this.productService.standard_table_data));
    this.standardTableData = this.productService.getStandardListData();

    this.gridOptions = {
      context: {
        componentParent: this,
        parent: 'products',
      },
    };

    this.enableDisableIsAddList = !this.standardTableData.some((val)=>{
      return val.is_table_exist
    })
  }


  colDef: ColDef[] = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      maxWidth: 30,
      showDisabledCheckboxes: true,
    },
    { headerName: 'Table Name', field: 'table_name.value' },
    { headerName: 'Table Description', field: 'description.value' },
    {
      headerName: 'Existing in Product List',
      field: 'is_table_exist',
      valueFormatter: (p) => (p.value ? 'Yes' : 'No'),
    },
  ];

  showHidePanel() {
    this.isPanel = !this.isPanel;
  }

  selectedTableListData(data: any) {
    this.checkedTableData = data;

    let yesExist = this.standardTableData.some((val)=>{
      return val.is_table_exist;
    })

    if (yesExist || this.checkedTableData.length) { 
      this.enableDisableIsAddList = false;
    } else {
      this.enableDisableIsAddList = true;
    }
  }

  AddSelectedList() {
    if (this.checkedTableData.length) {
      let localStorageItems: StandardTableProducts[] = JSON.parse(
        localStorage.getItem('LocalList_Data') || '[]'
      );

      let standardItems: StandardTableProducts[] =
        this.productService.getStandardListData();

      standardItems.map((data) => {
        let check = this.checkedTableData.some((val) => {
          return val.table_id.value == data.table_id.value;
        });

        if (!data.is_table_exist) {
          data.is_table_exist = check;
        }
        return data;
      });
      
      this.productService.setStandardListData(standardItems);

      this.checkedTableData.map((data) => {
        localStorageItems.unshift(data);
      });

      localStorageItems = localStorageItems.map((data) => {
        delete data.is_table_exist;
        return data;
      });

      this.productService.setLocalListData(localStorageItems);
    }
  }
}
