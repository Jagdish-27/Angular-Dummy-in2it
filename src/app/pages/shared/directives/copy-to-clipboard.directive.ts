import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appCopyToClipboard]',
})
export class CopyToClipboardDirective {
  @Input() appCopyToClipboard!: string;

  constructor() {}

  @HostListener('click')
  onClick() {
    if (this.appCopyToClipboard) {
      const textarea = document.createElement('textarea');
      textarea.value = this.appCopyToClipboard;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      alert('Text Copied Successfully');
      document.body.removeChild(textarea);
    }
  }
}
