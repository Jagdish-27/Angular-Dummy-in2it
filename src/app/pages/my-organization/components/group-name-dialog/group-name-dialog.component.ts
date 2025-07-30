import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-group-name-dialog',
  templateUrl: './group-name-dialog.component.html',
  styleUrls: ['./group-name-dialog.component.css'],
})
export class GroupNameDialogComponent {
  groupName = '';
  @Output() submitted = new EventEmitter<string>();
  @Output() closed = new EventEmitter<void>();

  submit(): void {
    if (this.groupName.trim()) {
      this.submitted.emit(this.groupName.trim());
    }
  }

  close(): void {
    this.closed.emit();
  }
}
