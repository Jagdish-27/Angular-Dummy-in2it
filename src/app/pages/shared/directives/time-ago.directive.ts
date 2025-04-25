import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appTimeAgo]',
})
export class TimeAgoDirective implements OnChanges {
  @Input() appTimeAgo!: Date;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appTimeAgo']) {
      this.updateTimeAgo();
    }
  }

  private updateTimeAgo(): void {
    if (this.appTimeAgo instanceof Date) {
      const timeDifference = Date.now() - this.appTimeAgo.getTime();
      const secondsAgo = Math.floor(timeDifference / 1000);

      let text: string;

      if (secondsAgo < 60) {
        text = 'just now';
      } else if (secondsAgo < 3600) {
        const minutes = Math.floor(secondsAgo / 60);
        text = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      } else if (secondsAgo < 86400) {
        const hours = Math.floor(secondsAgo / 3600);
        text = `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else {
        const days = Math.floor(secondsAgo / 86400);
        text = `${days} day${days > 1 ? 's' : ''} ago`;
      }

      this.renderer.setProperty(this.el.nativeElement, 'textContent', text);
    }
  }
}
