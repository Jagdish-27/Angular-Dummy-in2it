import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(private http: HttpClient) {}

  userList: any = [];
  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    let url = 'https://jsonplaceholder.typicode.com/users';
    this.http.get(url).subscribe({
      next: (res: any) => {
        this.userList = res;
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
  searchText: any = '';
  usersSuggestions: any = [];
  onKeyEnter(target: any) {
    let value = target.value;
    this.searchText = value;

    this.usersSuggestions = [];
    this.userList.forEach((element: { name: string; id: any; email: any }) => {
      const regexp = new RegExp(value, 'gi');
      if (regexp.test(element.name)) {
        this.usersSuggestions.push({
          id: element.id,
          name: element.name,
          type: element.email,
        });
      }
    });
  }
}
