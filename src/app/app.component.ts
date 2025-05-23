import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Angular-Starter';

  constructor(private router: Router, private spinner: NgxSpinnerService) {}
  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.spinner.show();
      } else if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.spinner.hide();
        }, 2000);
      }
    });
  }
}
