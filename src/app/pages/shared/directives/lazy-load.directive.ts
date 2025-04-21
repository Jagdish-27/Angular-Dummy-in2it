import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLazyLoad]',
})
export class LazyLoadDirective {
  constructor(private el: ElementRef, private renderer2: Renderer2) {}

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (this.isImageInViewPort()) {
      this.loadImage();
    }
  }

  isImageInViewPort() {
    let rect = this.el.nativeElement.getBoundingClientRect();

    let { top, left, bottom, right } = rect;

    return (
      (top >= 0 && left >= 0 && bottom <= window.innerHeight) ||
      (bottom <= document.documentElement.clientHeight &&
        right <= window.innerWidth) ||
      right <= document.documentElement.clientWidth
    );
  }

  loadImage() {
    let dataSrc = this.el.nativeElement.getAttribute('data-src');

    if (dataSrc) {
      this.renderer2.setAttribute(this.el.nativeElement, 'src', dataSrc);
      this.el.nativeElement.removeAttribute('data-src');
    }
  }
}
