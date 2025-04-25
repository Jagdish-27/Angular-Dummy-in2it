import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appHighlightSearch]',
})
export class HighlightSearchDirective implements OnChanges {
  @Input() searchQuery!: string;

  private originalText: string = '';

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    const element = this.el.nativeElement;

    if (!this.originalText) {
      this.originalText = element.innerText;
    }

    if (!this.searchQuery || this.searchQuery.length === 0) {
      element.innerHTML = this.originalText;
      return;
    }

    const regex = new RegExp(`(${this.escapeRegExp(this.searchQuery)})`, 'gi');
    const highlightedText = this.originalText.replace(regex, '<mark>$1</mark>');
    element.innerHTML = highlightedText;
  }

  private escapeRegExp(query: string): string {
    return query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
}
