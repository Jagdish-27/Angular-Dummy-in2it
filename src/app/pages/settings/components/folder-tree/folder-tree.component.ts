import { Component, ElementRef, ViewChild } from '@angular/core';

interface Folder {
  name: string;
  children: Folder[];
}

@Component({
  selector: 'app-folder-tree',
  templateUrl: './folder-tree.component.html',
  styleUrls: ['./folder-tree.component.css'],
})
export class FolderTreeComponent {
  @ViewChild('newFolderInput') newFolderInput!: ElementRef<HTMLInputElement>;

  folders: Folder[] = [];
  isCreating = false;
  newFolderName = '';

  startCreatingFolder() {
    this.isCreating = true;
    this.newFolderName = '';

    // Let Angular render the input before focusing
    setTimeout(() => {
      this.newFolderInput?.nativeElement.focus();
    }, 0);
  }

  saveFolder() {
    const name = this.newFolderName.trim();
    if (name) {
      this.folders.push({ name, children: [] });
    }
    this.isCreating = false;
    this.newFolderName = '';
  }

  cancelFolder() {
    const name = this.newFolderName.trim();
    if (name) {
      this.folders.push({ name, children: [] });
    }
    this.isCreating = false;
    this.newFolderName = '';
  }
}
