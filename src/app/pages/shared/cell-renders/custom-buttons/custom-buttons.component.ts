import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { StandardTableProducts } from 'src/app/interfaces/TableProducts';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-custom-buttons',
  templateUrl: './custom-buttons.component.html',
  styleUrls: ['./custom-buttons.component.css'],
})
export class CustomButtonsComponent {
  constructor(private productsService: ProductsService) {}

  params!: ICellRendererParams;
  label!: string;

  isEditable: boolean = false;

  agInit(param: ICellRendererParams): void {
    this.params = param;
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  onClickEdit() {
    let parentComponent = this.params.context.parent;
    if (parentComponent == 'tasks') {
      this.params.context.componentParent.editItem(
        this.params.data,
        this.params.rowIndex
      );
      this.params.context.componentParent.isEditable = true;
    } else if (parentComponent == 'localList') {
      this.isEditable = true;

      this.params.data.isEditing = true;

      const updated_data = JSON.parse(JSON.stringify(this.params.data));

      this.params.data.updatedData = updated_data;
    }
  }

  onSaveStopEditing() {
    this.isEditable = false;

    if (!this.params.data.isAddMode) {
      this.params.data.isEditing = false;

      this.params.data.table_name.value =
        this.params.data.updatedData.table_name.value;
      this.params.data.description.value =
        this.params.data.updatedData.description.value;
      delete this.params.data.isEditing;
      delete this.params.data.updatedData;
      localStorage.setItem(
        'LocalList_Data',
        JSON.stringify(this.params.context.componentParent.localTableList)
      );
    } else {
      this.params.data.isAddMode = false;
      this.params.data.table_name.value =
        this.params.data.updatedData.table_name.value;
      this.params.data.description.value =
        this.params.data.updatedData.description.value;
      delete this.params.data.isAddMode;
      delete this.params.data.updatedData;
      let filteredData =
        this.params.context.componentParent.localTableList.filter(
          (val: any) => !val.isAddMode
        );
      localStorage.setItem('LocalList_Data', JSON.stringify(filteredData));
    }
  }

  deleteUser() {
    let parentComponent = this.params.context.parent;

    if (parentComponent == 'tasks') {
      this.params.context.componentParent.deleteUser(this.params.data.id);
    } else if (parentComponent == 'localList') {
      this.params.api.applyTransaction({ remove: [this.params.data] });

      let localStorageItems: StandardTableProducts[] =
        this.productsService.getLocalListData();

      let standardItems: StandardTableProducts[] =
        this.productsService.getStandardListData();

      standardItems.map((data) => {
        if (this.params.data.table_id.value == data.table_id.value) {
          data.is_table_exist = false;
        }
        return data;
      });

      this.productsService.setStandardListData(standardItems);

      localStorageItems = localStorageItems.filter((data) => {
        return data.table_id.value !== this.params.data.table_id.value;
      });

      this.productsService.setLocalListData(localStorageItems);

      this.params.context.componentParent.localTableList =
        this.productsService.getLocalListData();
    }
  }

  onCancelClick() {
    this.isEditable = false;

    this.params.data.isEditing = false;
    this.params.context.action = 'cancel';
    delete this.params.data.updatedData;
  }

  onRemoveClick() {
    this.params.api.applyTransaction({ remove: [this.params.data] });
  }
}
