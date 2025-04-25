import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: string[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.buildBreadcrumbs(event.urlAfterRedirects);
      });
  }

  buildBreadcrumbs(url: string) {
    const segments = url.split('/').filter((seg) => seg);
    this.breadcrumbs = segments;
  }

  getLink(index: number): string {
    return '/' + this.breadcrumbs.slice(0, index + 1).join('/');
  }

  beautify(text: string): string {
    return text
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
