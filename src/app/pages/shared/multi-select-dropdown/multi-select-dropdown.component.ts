import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
export interface IDropdownSettings {
  singleSelection?: boolean;
  idField?: string;
  textField?: string;
  disabledField?: string;
  enableCheckAll?: boolean;
  selectAllText?: string;
  unSelectAllText?: string;
  allowSearchFilter?: boolean;
  clearSearchFilter?: boolean;
  maxHeight?: number;
  itemsShowLimit?: number;
  limitSelection?: number;
  searchPlaceholderText?: string;
  noDataAvailablePlaceholderText?: string;
  closeDropDownOnSelection?: boolean;
  showSelectedItemsAtTop?: boolean;
  defaultOpen?: boolean;
  allowRemoteDataSearch?: boolean;
}
export declare class ListItem {
  id: String | number;
  text: String | number;
  isDisabled?: boolean;
  constructor(source: any);
}
@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.css'],
})
export class MultiSelectDropdownComponent implements OnInit {
  @Input() dropdownList: any;
  @Input() selectedItems: any;
  @Input() dropdownSettings!: IDropdownSettings;
  @Input() placeholder: any;
  @Output() onItemsChange = new EventEmitter<any>();

  ngOnInit(): void {}

  onItemSelect(_event: any) {
    this.onItemsChange.emit(this.selectedItems);
  }

  onSelectAll(event: any) {
    this.selectedItems = event;
    this.onItemsChange.emit(event);
  }

  onItemDeSelectAll(_event: any) {
    this.selectedItems = [];
    this.onItemsChange.emit(this.selectedItems);
  }

  onItemDeSelect(_event: any) {
    this.onItemsChange.emit(this.selectedItems);
  }
}
