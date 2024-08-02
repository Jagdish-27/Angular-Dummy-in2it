import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HeaderTitleSubject, OrganizationData } from 'src/app/interfaces/Product';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-nav-tab',
  templateUrl: './nav-tab.component.html',
  styleUrls: ['./nav-tab.component.css']
})
export class NavTabComponent implements OnInit, OnChanges, OnDestroy {


  constructor(private serverService: ServerService,private router:Router,private route:ActivatedRoute) { }

  unSub = new Subject();

  unSubId  = new Subject();

  unSubOrg = new Subject();

  header: HeaderTitleSubject = {
    link: '',
    module: ''
  };

  navs: OrganizationData[] = []
  // navs: number[] = JSON.parse(localStorage.getItem('tabs') || '[]');
  counter = this.navs.length + 1;
  active: number = 1;

  ngOnInit(): void {
    this.navs = JSON.parse(localStorage.getItem('tabs') || '[]');
    // this.header.link = 'Organization';
    this.serverService.headerTitleSubject.pipe(takeUntil(this.unSub)).subscribe((data: HeaderTitleSubject) => this.header = data);
    


    // this.route.params.subscribe(params=>{
    //   this.active = +params['id']
    // })

    this.serverService.currentTabId.pipe(takeUntil(this.unSubId)).subscribe((id)=>{

      this.active = id;
    })

    this.serverService.orgDataSubject.pipe(takeUntil(this.unSubOrg)).subscribe((data: OrganizationData) =>{
      // this.orgData.push(data);

      const orgIndex = this.navs.findIndex((value)=> value.id === data.id);

      if(orgIndex < 0){
        this.navs.push(data);
        this.active = data.id;
        this.serverService.setCurrentTabId(this.active);
        this.router.navigate(['my-organization/organization/detail']); 
        this.saveTabsState();
      }
    });

  }

  ngOnChanges(_changes: SimpleChanges): void {

  }

  ngOnDestroy(): void {
    this.unSub.next(null);
    this.unSub.complete();
    this.unSubOrg.next(null);
    this.unSubOrg.complete();
    this.unSubId.next(null);
    this.unSubId.complete();
  }
  close(event: MouseEvent, toRemove: number) {
    this.navs = this.navs.filter((val) => val.id !== toRemove);
    if (this.active === toRemove && this.navs.length > 0) {
      this.active = this.navs[this.navs.length - 1].id;
      this.serverService.setCurrentTabId(this.active);
      this.router.navigate(['my-organization/organization/detail']);
    } else if (this.navs.length === 0) {
      this.router.navigate(['/my-organization/organization']);
    }
    this.saveTabsState();
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  // add(event: MouseEvent) {
  //   this.navs.push(this.counter++);
  //   this.saveTabsState();
  //   event.preventDefault();
  // }

  activeTab(id: number,moduleTab:string) {

    if(moduleTab == 'contact' && id == 0){
      return;
    }
    
    if(id == 0 && moduleTab !== 'contact'){
      this.router.navigate(['/my-organization/'+this.header.link]);
    }else{
      this.router.navigate(['my-organization/organization/detail']);
    }
    this.active = id;
    this.serverService.setCurrentTabId(this.active);
  }

  saveTabsState(): void {
    localStorage.setItem('tabs', JSON.stringify(this.navs));
  }

}
