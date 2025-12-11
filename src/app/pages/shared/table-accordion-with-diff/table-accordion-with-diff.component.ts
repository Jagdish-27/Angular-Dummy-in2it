import { Component, Input, OnInit } from '@angular/core';
// import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-table-accordion-with-diff',
  templateUrl: './table-accordion-with-diff.component.html',
  styleUrls: ['./table-accordion-with-diff.component.css'],
})
export class TableAccordionWithDiffComponent implements OnInit {
  @Input() deviceID: any;
  @Input() parentRef: any;
  @Input() iFaceCustomTableHeaders: any;
  @Input() columnsOfInterfaces: any;
  isCollapsed = false;
  opened: any;
  constructor() // private deviceServiceInventory: DevicesService,
  // private deviceDiscoverService: DiscoveryLogsService,
  // private messageService: MessageBoxService,
  // private spiner: NgxSpinnerService
  {
    this.noRowsTemplate = `<span class="mt-5"  style="color:black;    margin-top:100%; position:relative">No Data to show</span>`;
  }

  ngOnInit(): void {
    this.paginationPageSize = 10;
    this.min =
      this.paginationPageSize * this.modPagination.currentPage -
      this.paginationPageSize +
      1;
    this.max = this.paginationPageSize * this.modPagination.currentPage;
    if (this.parentRef == 'discovery') {
      // this.getDeviceInterfaceInfo(this.deviceID);
    }

    if (this.parentRef == 'inventory') {
      this.getInventoryDeviceInterfaceInfo(this.deviceID);
    }
  }

  noRowsTemplate;
  openedPanel: string = '';

  // table part
  body: any = {
    search: '',
    min: 0,
    max: 10,
  };
  /// device interface part of Inventory
  getInventoryDeviceInterfaceInfo(deviceId: any) {
    // this.spiner.show();
    // this.deviceServiceInventory
    //   .getDeviceInventoryInterfaces(
    //     deviceId,
    //     this.body.search,
    //     this.body.min,
    //     this.body.max
    //   )
    //   .subscribe({
    //     next: (res: any) => {
    //       this.spiner.hide();
    //       if (res.status == 200 && res.body) {
    //         this.interfaces = res.body.results;
    //         this.interfaces.forEach((data: any, i: number) => {
    //           (data.id = i + 1), (data.expand = false);
    //           //  TESTING:
    //           if (data.cmdb && data.snmp) {
    //             data.cmdb.child = data.cmdb.child[0] ?? '';
    //             data.snmp.child = data.cmdb.child[0] ?? '';
    //             data.cmdb.parent = data.cmdb.parent?.name;
    //             data.snmp.parent = data.cmdb.parent?.name;
    //             data.cmdb.vlan_name = data.cmdb.vlan?.name;
    //             data.snmp.vlan_name = data.snmp.vlan?.name;
    //             data.cmdb.vlan_no = data.cmdb.vlan?.id;
    //             data.snmp.vlan_no = data.snmp.vlan?.id;
    //           }
    //           if (!data.cmdb || !data.snmp) {
    //             data.isChangedOrMissing = false;
    //             return;
    //           }
    //           let rowHasNoChange = this.columnsOfInterfaces.some(
    //             (colKey: any) => {
    //               return (
    //                 this.isChanged(data?.cmdb[colKey], data?.snmp[colKey]) ||
    //                 this.isMissingVal(data?.cmdb[colKey], data?.snmp[colKey])
    //               );
    //             }
    //           );
    //           data.isChangedOrMissing = rowHasNoChange;
    //         });
    //         this.totalCount = res.body?.count;
    //         this.modPagination.totalPages = Math.ceil(
    //           this.totalCount / parseInt(this.paginationPageSize)
    //         );
    //       }
    //     },
    //     error: (err: any) => {
    //       this.spiner.hide();
    //       this.messageService.show({ text: err?.error?.errorMsg });
    //     },
    //   });
  }

  /// device interface part of discovery
  // getDeviceInterfaceInfo(deviceId: any) {
  //   this.spiner.show();
  //   this.deviceDiscoverService
  //     .getDeviceDiscoveryInterface(
  //       deviceId,
  //       this.body.search,
  //       this.body.min,
  //       this.body.max
  //     )
  //     .subscribe({
  //       next: (res: any) => {
  //         this.spiner.hide();
  //         if (res.status == 200 && res.body) {
  //           this.interfaces = res.body.records;
  //           this.interfaces.forEach((data: any, i: number) => {
  //             (data.id = i + 1), (data.expand = false);

  //             if (!data.cmdb || !data.snmp) {
  //               data.isChangedOrMissing = false;
  //               return;
  //             }

  //             let rowHasNoChange = this.columnsOfInterfaces.some(
  //               (colKey: any) => {
  //                 return (
  //                   this.isChanged(data?.cmdb[colKey], data?.snmp[colKey]) ||
  //                   this.isMissingVal(data?.cmdb[colKey], data?.snmp[colKey])
  //                 );
  //               }
  //             );
  //             data.isChangedOrMissing = rowHasNoChange;
  //           });
  //           this.totalCount = res.body?.current_count;
  //           this.modPagination.totalPages = Math.ceil(
  //             this.totalCount / parseInt(this.paginationPageSize)
  //           );
  //         }
  //       },
  //       error: (err: any) => {
  //         this.spiner.hide();
  //         this.messageService.show({ text: err?.error?.errorMsg });
  //       },
  //     });
  // }

  interfaces: any[] = [];

  //  toggle method for expand/collapse
  toggle(row: any) {
    if (row.isChangedOrMissing) {
      row.expanded = !row.expanded;
    }
    this.isAnyAccordianExpanded();
  }
  isAccordianOpen: boolean = false;
  isAnyAccordianExpanded() {
    this.isAccordianOpen = this.interfaces.some((data: any) => data.expanded);
  }
  getTdClass(cmdbVal: any, snmpVal: any) {
    return {
      'bg-light': this.isMissingVal(cmdbVal, snmpVal),
      'bg-yellow': this.isChanged(cmdbVal, snmpVal),
    };
  }

  isMissingVal(cmbd: any, snmp: any): boolean {
    if (!cmbd && !snmp) {
      return false;
    }
    if (!cmbd || !snmp) return true;
    return false;
  }

  isChanged(cmbd: any, snmp: any) {
    if (!cmbd && !snmp) {
      return false;
    }
    return !this.isMissingVal(cmbd, snmp) && cmbd !== snmp;
  }

  selectedRowsData: number[] = [];
  allChecked = false;

  //  checks/unchecks a single row
  onCheckboxChange(row: any, event: any) {
    row.isChecked = event.target.checked;

    if (row.isChecked) {
      if (!this.selectedRowsData.includes(row.id)) {
        this.selectedRowsData.push(row.id);
      }
    } else {
      this.selectedRowsData = this.selectedRowsData.filter(
        (id) => id !== row.id
      );
    }
    // Recalculate if everything is checked
    this.updateAllChecked();
  }

  //  Select All / Deselect All
  checkAndUncheckAll() {
    this.allChecked = !this.allChecked;

    this.interfaces.forEach((row: any) => {
      row.isChecked = this.allChecked;
    });

    this.selectedRowsData = this.allChecked
      ? this.interfaces.map((r) => r.id)
      : [];
  }

  // Updates the "Select All" checkbox state
  updateAllChecked() {
    this.allChecked =
      this.interfaces.length > 0 &&
      this.interfaces.every((r: any) => r.isChecked);
  }

  expandAll() {
    this.interfaces.forEach((data: any) => {
      data.expanded = data.isChangedOrMissing;
    });
    this.isAnyAccordianExpanded();
  }

  retrackAll() {
    this.interfaces.forEach((data: any) => {
      data.expanded = false;
    });
    this.isAnyAccordianExpanded();
  }
  paginationPageSize: any;

  modPagination = {
    totalRecords: 0,
    currentPage: 1,
    totalPages: 0,
    recordsOnPage: 0,
    isLastPage: false,
  };
  totalCount = 0;
  min: number = 0;
  max: number = 0;

  selectPageCounts(_value: any) {
    this.modPagination.currentPage = 1;
    this.modPagination.totalPages = Math.ceil(
      this.totalCount / parseInt(this.paginationPageSize)
    );
    this.min =
      this.paginationPageSize * this.modPagination.currentPage -
      this.paginationPageSize +
      1;
    this.max = this.paginationPageSize * this.modPagination.currentPage;
    this.body.min = this.min;
    this.body.max = this.max;
    if (this.parentRef == 'discovery') {
      // this.getDeviceInterfaceInfo(this.deviceID);
    }

    if (this.parentRef == 'inventory') {
      this.getInventoryDeviceInterfaceInfo(this.deviceID);
    }
  }

  onBtPrevious() {
    this.modPagination.currentPage = this.modPagination.currentPage - 1;
    this.min =
      this.paginationPageSize * this.modPagination.currentPage -
      this.paginationPageSize +
      1;
    this.max = this.paginationPageSize * this.modPagination.currentPage;
    this.body.min = this.min;
    this.body.max = this.max;
    if (this.parentRef == 'discovery') {
      // this.getDeviceInterfaceInfo(this.deviceID);
    }

    if (this.parentRef == 'inventory') {
      this.getInventoryDeviceInterfaceInfo(this.deviceID);
    }
  }

  toSelectedPage(event: any) {
    if (parseInt(event.target.value) > this.modPagination.totalPages) {
      this.modPagination.currentPage = this.modPagination.totalPages;
    } else if (parseInt(event.target.value) < 0) {
      event.target.value = 1;
      this.modPagination.currentPage = 1;
    }
    this.min =
      this.paginationPageSize * this.modPagination.currentPage -
      this.paginationPageSize +
      1;
    this.max = this.paginationPageSize * this.modPagination.currentPage;
    this.body.min = this.min;
    this.body.max = this.max;
    if (this.parentRef == 'discovery') {
      // this.getDeviceInterfaceInfo(this.deviceID);
    }

    if (this.parentRef == 'inventory') {
      this.getInventoryDeviceInterfaceInfo(this.deviceID);
    }
  }

  onBtNext() {
    this.modPagination.currentPage = this.modPagination.currentPage + 1;
    this.min =
      this.paginationPageSize * this.modPagination.currentPage -
      this.paginationPageSize +
      1;
    this.max = this.paginationPageSize * this.modPagination.currentPage;
    this.body.min = this.min;
    this.body.max = this.max;
    if (this.parentRef == 'discovery') {
      // this.getDeviceInterfaceInfo(this.deviceID);
    }

    if (this.parentRef == 'inventory') {
      this.getInventoryDeviceInterfaceInfo(this.deviceID);
    }
  }
}
