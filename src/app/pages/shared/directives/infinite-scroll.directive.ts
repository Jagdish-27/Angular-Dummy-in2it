import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]',
})
export class InfiniteScrollDirective {
  @Input() scrollThreshold = 100;
  @Output() scrolled = new EventEmitter<void>();

  constructor() {}

  @HostListener('scroll', ['$event'])
  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    const atBottom =
      element.scrollHeight - element.scrollTop <=
      element.clientHeight + this.scrollThreshold;

    if (atBottom) {
      this.scrolled.emit();
    }
  }
}
