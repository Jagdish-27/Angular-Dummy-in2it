import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  HostListener,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective implements OnInit {
  @Input('appTooltip') tooltipText: string = '';
  tooltipElement!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    // Ensure host has position: relative for correct positioning
    const position = getComputedStyle(this.el.nativeElement).position;
    if (position === 'static' || !position) {
      this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.tooltipText) return;

    this.createTooltip();
    this.setPosition();
    this.renderer.setStyle(this.tooltipElement, 'display', 'block');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.tooltipElement) {
      this.renderer.removeChild(this.el.nativeElement, this.tooltipElement);
    }
  }

  private createTooltip() {
    this.tooltipElement = this.renderer.createElement('div');
    this.tooltipElement.innerText = this.tooltipText;

    this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);
    this.renderer.addClass(this.tooltipElement, 'custom-tooltip');

    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipElement, 'display', 'none');
    this.renderer.setStyle(this.tooltipElement, 'z-index', '1000');
  }

  private setPosition() {
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltipElement.getBoundingClientRect();

    const top = hostPos.height + 8;
    const left = (hostPos.width - tooltipPos.width) / 2;

    this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
  }
}
