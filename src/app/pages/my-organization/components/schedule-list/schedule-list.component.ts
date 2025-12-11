import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css'],
})
export class ScheduleListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.rows.forEach((data: any) => {
      let rowHasNoChange = data.fieldArray.some((field: any) => {
        return this.isChanged(field) || this.isMissingVal(field);
      });

      data.isChangedOrMissing = rowHasNoChange;
    });
  }

  currentInfo: any = {
    hostname: 'GPN-0209_THO_NEB-01',
    ipAddress: '172.31.108.72',
    softwareVersion: 'VRP (R) software, Version 8.230',
    deviceType: 'NetEngine 8000 M1C',
    platform: '',
    serialNo: '210235A12N10C000123',
    description: 'Huawei Versatile Routing Platform...',
    osVersion: '8.230',
    uptime: '07:49:43',
    lastDiscover: '16 Oct 2025 12:26 PM',
  };

  previousInfo: any = {
    hostname: 'GPN-0209_THO_NEB-01',
    ipAddress: '172.31.108.72',
    softwareVersion: 'JP (R) software, Version 8.240',
    deviceType: 'NetEngine 8000 M1C',
    platform: '',
    serialNo: '210235A12N10C000123',
    description: '',
    osVersion: '8.230',
    uptime: '07:49:43',
    lastDiscover: '15 Oct 2025 12:26 PM',
  };

  /** Check if values differ */
  isDifferent(field: string): boolean {
    if (this.currentInfo[field] && this.previousInfo[field]) {
      return this.currentInfo[field] !== this.previousInfo[field];
    }
    return false;
  }

  /** Check if previous value is missing */
  isMissing(field: string): boolean {
    if (!this.previousInfo[field] && !this.currentInfo[field]) {
      return false;
    }
    if (!this.previousInfo[field] || !this.currentInfo[field]) return true;
    return !this.previousInfo[field];
  }

  fields: { key: any; label: string }[] = [
    { key: 'hostname', label: 'Hostname' },
    { key: 'ipAddress', label: 'IP Address' },
    { key: 'softwareVersion', label: 'Software Version' },
    { key: 'deviceType', label: 'Device Type' },
    { key: 'platform', label: 'Platform' },
    { key: 'serialNo', label: 'Serial No.' },
    { key: 'description', label: 'Description' },
    { key: 'osVersion', label: 'OS Version' },
    { key: 'uptime', label: 'Uptime' },
    { key: 'lastDiscover', label: 'Last Discover' },
  ];

  // table component

  rows: any[] = [
    {
      id: 1,
      name: 'GlobalEthernet0/0/1.40',
      expanded: false,
      fieldArray: [
        { key: 'source', previous: 'Log 100', current: 'Log 100' },
        { key: 'mtu', previous: 1492, current: 1500 }, // changed
        { key: 'speed', previous: '100Mbps', current: '1000Mbps' }, // changed
        { key: 'comments', previous: '', current: '' }, // missing
        { key: 'ipAddress', previous: '172.19.2.1', current: '172.19.2.1' },
      ],
    },
    {
      id: 2,
      name: 'GigabitEthernet0/2/5',
      expanded: false,
      fieldArray: [
        { key: 'source', previous: 'Log 90', current: 'Log 90' },
        { key: 'ipAddress', previous: '172.19.2.1', current: '172.19.2.5' }, // changed
        { key: 'mtu', previous: 1500, current: '' }, // missing
        { key: 'speed', previous: '1000Mbps', current: '1000Mbps' },
      ],
    },
    {
      id: 3,
      name: 'FastEthernet0/1/1',
      expanded: false,
      fieldArray: [
        { key: 'source', previous: 'SNMP', current: 'SNMP' },
        { key: 'ipAddress', previous: '10.1.1.1', current: '10.1.1.1' },
        { key: 'mtu', previous: 1500, current: 1500 },
        { key: 'speed', previous: '100Mbps', current: '100Mbps' },
        {
          key: 'comments',
          previous: 'Uplink to Core',
          current: 'Uplink to Core',
        },
      ],
    },
    {
      id: 4,
      name: 'FastEthernet0/1/2',
      expanded: false,
      fieldArray: [
        { key: 'source', previous: 'CMDB', current: 'SNMP' }, // changed
        { key: 'ipAddress', previous: '10.1.1.2', current: '' }, // missing
        { key: 'mtu', previous: 1500, current: 1500 },
        { key: 'speed', previous: '100Mbps', current: '100Mbps' },
        { key: 'comments', previous: 'Backup link', current: 'Backup link' },
      ],
    },
    {
      id: 5,
      name: 'GigabitEthernet0/3/1',
      expanded: false,
      fieldArray: [
        { key: 'source', previous: 'Log 200', current: 'Log 200' },
        { key: 'ipAddress', previous: '172.16.1.1', current: '172.16.1.1' },
        { key: 'mtu', previous: 9000, current: 9000 },
        { key: 'speed', previous: '1000Mbps', current: '1000Mbps' },
        { key: 'comments', previous: '', current: '' }, // missing
      ],
    },
    {
      id: 6,
      name: 'Jagdish/0/1.40',
      expanded: false,
      fieldArray: [
        { key: 'source', previous: 'Log 100', current: 'Log 100' },
        { key: 'mtu', previous: 1492, current: 1500 }, // changed
        { key: 'speed', previous: '100Mbps', current: '1000Mbps' }, // changed
        { key: 'comments', previous: '', current: '' }, // missing
        { key: 'ipAddress', previous: '172.19.2.1', current: '172.19.2.1' },
      ],
    },
    {
      id: 7,
      name: 'GigabitEthernet0/2/5',
      expanded: false,
      fieldArray: [
        { key: 'source', previous: 'Log 90', current: 'Log 90' },
        { key: 'ipAddress', previous: '172.19.2.1', current: '172.19.2.5' }, // changed
        { key: 'mtu', previous: 1500, current: '' }, // missing
        { key: 'speed', previous: '1000Mbps', current: '1000Mbps' },
      ],
    },
    {
      id: 8,
      name: 'FastEthernet0/1/1',
      expanded: false,
      fieldArray: [
        { key: 'source', previous: 'SNMP', current: 'SNMP' },
        { key: 'ipAddress', previous: '10.1.1.1', current: '10.1.1.1' },
        { key: 'mtu', previous: 1500, current: 1500 },
        { key: 'speed', previous: '100Mbps', current: '100Mbps' },
        {
          key: 'comments',
          previous: 'Uplink to Core',
          current: 'Uplink to Core',
        },
      ],
    },
    {
      id: 9,
      name: 'FastEthernet0/1/2',
      expanded: false,
      fieldArray: [
        { key: 'source', previous: 'CMDB', current: 'SNMP' }, // changed
        { key: 'ipAddress', previous: '10.1.1.2', current: '' }, // missing
        { key: 'mtu', previous: 1500, current: 1500 },
        { key: 'speed', previous: '100Mbps', current: '100Mbps' },
        { key: 'comments', previous: 'Backup link', current: 'Backup link' },
      ],
    },
    {
      id: 10,
      name: 'GigabitEthernet0/3/1',
      expanded: false,
      fieldArray: [
        { key: 'source', previous: 'Log 200', current: 'Log 200' },
        { key: 'ipAddress', previous: '172.16.1.1', current: '172.16.1.1' },
        { key: 'mtu', previous: 9000, current: 9000 },
        { key: 'speed', previous: '1000Mbps', current: '1000Mbps' },
        { key: 'comments', previous: '', current: '' }, // missing
      ],
    },
  ];
  /** Check if previous value is missing */
  isMissingVal(value: any): boolean {
    if (!value.current && !value.previous) {
      return false;
    }
    if (!value.current || !value.previous) return true;
    return !value.previous;
  }

  isChanged(value: any) {
    return !this.isMissingVal(value) && value.previous !== value.current;
  }

  selectedRowsData: number[] = [];
  allChecked = false;

  // Called when user checks/unchecks a single row
  onCheckboxChange(row: any, event: any) {
    row.isChecked = event.target.checked;

    if (row.isChecked) {
      // Add ID if not already in the selected list
      if (!this.selectedRowsData.includes(row.id)) {
        this.selectedRowsData.push(row.id);
      }
    } else {
      // Remove ID
      this.selectedRowsData = this.selectedRowsData.filter(
        (id) => id !== row.id
      );
    }

    // Recalculate if everything is checked
    this.updateAllChecked();
  }

  // Updates the "Select All" checkbox state
  updateAllChecked() {
    this.allChecked =
      this.rows.length > 0 && this.rows.every((r) => r.isChecked);
  }

  // Master checkbox - Select All / Deselect All
  checkAndUncheckAll() {
    this.allChecked = !this.allChecked;

    // Set all rows
    this.rows.forEach((row) => {
      row.isChecked = this.allChecked;
    });

    // Update selected IDs
    this.selectedRowsData = this.allChecked ? this.rows.map((r) => r.id) : [];
  }

  // Example toggle method for expand/collapse
  toggle(row: any) {
    if (row.isChangedOrMissing) {
      row.expanded = !row.expanded;
    }
    this.isAnyAccordianExpanded();
  }

  expandAll() {
    this.rows.forEach((data: any) => {
      let rowHasNoChange = data.fieldArray.some((field: any) => {
        return this.isChanged(field) || this.isMissingVal(field);
      });

      data.expanded = rowHasNoChange;
    });
    this.isAnyAccordianExpanded();
  }

  retrackAll() {
    this.rows.forEach((data: any) => {
      data.expanded = false;
    });
    this.isAnyAccordianExpanded();
  }

  isAccordianOpen: boolean = false;
  isAnyAccordianExpanded() {
    this.isAccordianOpen = this.rows.some((data: any) => data.expanded);
  }

  // PAGINATION
  pageSize = 5; // rows per page
  currentPage = 1; // selected page
  totalRows = this.rows.length;

  get paginatedRows() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.rows.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.totalRows / this.pageSize);
  }

  // Dropdown handler
  onPageSizeChange(event: any) {
    this.pageSize = +event.target.value;
    this.currentPage = 1; // Reset page
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  previousPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  getMin(currentPage: number, pageSize: number, totalRows: number) {
    return Math.min(currentPage * pageSize, totalRows);
  }

  jumpToPage(event: any) {
    let page = Number(event.target.value);

    // If input is invalid, force to first page
    if (isNaN(page) || page < 1) {
      page = 1;
    }

    // If input exceeds total pages, force to last page
    if (page > this.totalPages) {
      page = this.totalPages;
    }

    this.currentPage = page;

    // Update input value visually (in case it auto-corrected)
    event.target.value = this.currentPage;
  }
}
