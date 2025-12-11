import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'diffHighlight',
})
export class DiffHighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(current: string = '', previous: string = ''): SafeHtml {
    if (!current) return current;
    if (!previous || current === previous)
      return this.sanitizer.bypassSecurityTrustHtml(current);

    const curWords = current.split(' ');
    const prevWords = previous.split(' ');

    const maxLen = Math.max(curWords.length, prevWords.length);
    const resultWords: string[] = [];

    for (let i = 0; i < maxLen; i++) {
      const curWord = curWords[i] || '';
      const prevWord = prevWords[i] || '';

      if (curWord === prevWord) {
        resultWords.push(curWord);
      } else {
        // Entire changed word highlighted
        resultWords.push(`<mark>${curWord}</mark>`);
      }
    }

    const final = resultWords.join(' ');

    return this.sanitizer.bypassSecurityTrustHtml(final);
  }
}
