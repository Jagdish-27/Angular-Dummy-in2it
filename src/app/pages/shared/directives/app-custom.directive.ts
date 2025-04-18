import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAppCustom]',
})
export class AppCustomDirective {
  @Input() appAppCustom?: string;

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.color = this.appAppCustom;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.color = null;
  }
}
