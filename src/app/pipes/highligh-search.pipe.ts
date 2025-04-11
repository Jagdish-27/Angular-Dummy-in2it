import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlighSearch',
})
export class HighlighSearchPipe implements PipeTransform {
  transform(value: any, searchText: string): any[] {
    if (!value) {
      return [];
    }
    if (!searchText) {
      return value;
    }

    const regexForSearch = new RegExp(searchText, 'gi');
    const valueAfterReplace = value.replace(
      regexForSearch,
      "<div style='color:red!important' class='yellow d-inline-flex fs-12px' > " +
        searchText +
        '</div>'
    );

    return valueAfterReplace;
  }
}
