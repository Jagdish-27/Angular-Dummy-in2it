import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-single-select-dropdown',
  templateUrl: './single-select-dropdown.component.html',
  styleUrls: ['./single-select-dropdown.component.css'],
})
export class SingleSelectDropdownComponent implements OnInit {
  @Input() optionsList: any;
  @Input() searchEnable = true;
  @Input() selectedItem: any;
  @Input() placeholderName: any;
  @Input() disabledField = false;
  @Input() requiredField = false;
  @Input() heightPx = 'unset';
  @Input() listItemDisable = false;
  @Input() listTextForDisable: any;
  @Input() singleFieldDisable: boolean = true;
  @Input() isShowAdditionalTemplate: boolean = false;
  @Input() additionalTemplateTextObj: any;
  @Input() selectSettings = {
    idField: 'id',
    textField: 'name',
    isFieldDisabled: 'isFieldDisabled',
  };
  @Output() selectItem = new EventEmitter();
  @Output() sendAdditionalTemplate = new EventEmitter();
  showdropdown: boolean = false;
  openDropdownCalled = false;
  showselectedItem: any = {};
  dropdownValues: any = [];
  /**
   * @author Jagdish
   * @description HostListener method use for close dropdown list when click outside
   * @param {none} none type
   * @returns {void}
   */
  @HostListener('document:click', ['$event'])
  hidePropertiesPanel() {
    if (this.openDropdownCalled) {
      this.showdropdown = !this.showdropdown;
      this.openDropdownCalled = false;
    } else {
      this.showdropdown = false;
    }
  }
  constructor() {}
  /**
   * @author Jagdish
   * @description ngOnchnage() method use show preselect data
   * @param {changes} SimpleChanges type
   * @returns {void}
   */
  ngOnChanges(_changes: SimpleChanges): void {
    if (
      this.selectedItem == null ||
      this.selectedItem === '' ||
      this.selectedItem == undefined
    ) {
      this.showselectedItem = {
        [this.selectSettings.idField]: '',
        [this.selectSettings.textField]: '',
      };
    } else {
      if (typeof this.selectedItem != 'object') {
        this.optionsList?.filter((el: any) => {
          if (el[this.selectSettings.idField] == this.selectedItem) {
            this.showselectedItem = JSON.parse(JSON.stringify(el));
          }
        });
      } else {
        this.showselectedItem = JSON.parse(JSON.stringify(this.selectedItem));
      }
    }
    if (this.optionsList) {
      this.dropdownValues = JSON.parse(JSON.stringify(this.optionsList));
    }
  }
  ngOnInit(): void {}
  public onOutsideClick(_event: any): void {
    this.showdropdown = false;
  }
  /**
   * @author Jagdish
   * @description opendropdonw() method use for dropdown list
   * @param {none}
   * @returns {void}
   */
  opendropdown() {
    this.openDropdownCalled = true;
    // this.showdropdown = !this.showdropdown;
    if (this.optionsList) {
      this.dropdownValues = JSON.parse(JSON.stringify(this.optionsList));
    }
  }
  /**
   * @author Jagdish
   * @description searchData() method use for search name from list
   * @param {event} event type
   * @returns {void}
   */
  searchdata(event: any) {
    const searchValue = event.target.value;
    this.dropdownValues = this.optionsList.filter((item: any) =>
      item[this.selectSettings.textField]
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );
    event.stopPropagation();
  }
  /**
   * @author Jagdish
   * @description selectData() method use for select data and emit fire select data
   * @param {data} selected data
   * @returns {void}
   */
  selectData(data: any) {
    this.showdropdown = false;
    this.showselectedItem = data;
    this.selectItem.emit(data);
  }

  clickOnAdditionalTemplate() {
    this.sendAdditionalTemplate.emit();
  }
}
