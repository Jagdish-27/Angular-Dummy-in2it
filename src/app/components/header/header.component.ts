import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Subject, takeUntil } from 'rxjs';
import { HeaderTitleSubject } from 'src/app/interfaces/Product';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private serverService:ServerService) { }

  unSub = new Subject();

  header:HeaderTitleSubject = {
    link: '',
    module: ''
  }

  ngOnInit(): void {
    this.serverService.headerTitleSubject.pipe(takeUntil(this.unSub)).subscribe((data:HeaderTitleSubject)=>this.header = data);
  }

  
  ngOnDestroy(): void {

    this.unSub.next(null);
    this.unSub.complete();
  }


}
