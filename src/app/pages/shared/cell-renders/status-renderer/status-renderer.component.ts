import { Component, OnInit } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-status-renderer',
  templateUrl: './status-renderer.component.html',
  styleUrls: ['./status-renderer.component.css'],
})
export class StatusRendererComponent implements OnInit {
  constructor() {}

  params!: ICellRendererParams;
  label!: string;

  toggleSwitch: boolean = false;

  agInit(param: ICellRendererParams): void {
    this.params = param;
    console.log('params', this.params);
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }
  ngOnInit(): void {}

  onSwitch() {
    if (this.toggleSwitch) console.log('switch Active');
    else {
      console.log('switch InActive');
    }
  }
}
