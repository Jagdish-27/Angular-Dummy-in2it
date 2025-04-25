import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDisableRightClick]',
})
export class DisableRightClickDirective {
  constructor() {}

  @HostListener('contextmenu', ['$event']) onRighClick(even: MouseEvent) {
    even.preventDefault();
  }
}
