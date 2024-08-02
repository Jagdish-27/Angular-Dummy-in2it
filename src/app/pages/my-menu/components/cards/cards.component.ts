import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  constructor() { }
  @Input() dataArr: any;

  default_name!: string;

  ngOnInit(): void {
    if (this.dataArr && this.dataArr.length > 0) {
      this.default_name = this.dataArr[0].name;
    }
  }

  onCardClick(name: string) {
    this.default_name = name;
  }
}
