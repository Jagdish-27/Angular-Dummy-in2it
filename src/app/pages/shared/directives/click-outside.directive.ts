import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  @Output() outSideClicked = new EventEmitter<MouseEvent>();

  constructor(private el: ElementRef) {}

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }

    const clickedInside = this.el.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.outSideClicked.emit(event);
    }
  }
}
