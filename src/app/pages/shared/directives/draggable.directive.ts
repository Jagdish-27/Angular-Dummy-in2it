import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDraggable]',
})
export class DraggableDirective {
  private isDragging = false;
  private offsetX = 0;
  private offsetY = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Set required styles
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grab');
    this.renderer.setStyle(this.el.nativeElement, 'user-drag', 'none');
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.isDragging = true;

    const rect = this.el.nativeElement.getBoundingClientRect();
    this.offsetX = event.clientX - rect.left;
    this.offsetY = event.clientY - rect.top;

    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grabbing');

    event.preventDefault();
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grab');
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;

    const left = event.clientX - this.offsetX;
    const top = event.clientY - this.offsetY;
    this.renderer.setStyle(this.el.nativeElement, 'position', 'absolute');
    this.renderer.setStyle(this.el.nativeElement, 'left', `${left}px`);
    this.renderer.setStyle(this.el.nativeElement, 'top', `${top}px`);
  }
}
