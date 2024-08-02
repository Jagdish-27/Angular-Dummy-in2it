import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-logic',
  templateUrl: './pagination-logic.component.html',
  styleUrls: ['./pagination-logic.component.css']
})
export class PaginationLogicComponent implements OnInit {

  constructor() { }

  @Input() totalItems: any;
  @Input() currentPage: any;
  @Input() itemsPerPage: any;

  @Output() onClick:EventEmitter<number> = new EventEmitter();

  totalPages = 0;

  pages:number[] = [];

  ngOnInit():void{
    setTimeout(() => {
      if(this.totalItems){
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.pages = Array.from({length:this.totalPages}, (_,i)=> i + 1)
      }
    }, 3000);
    
  }

  pageClicked(page:number){
    if(page > this.totalPages) return; 
    this.onClick.emit(page)
  }

}
