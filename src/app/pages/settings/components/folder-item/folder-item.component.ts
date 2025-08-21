import { Component, ElementRef, Input, ViewChild } from '@angular/core';

interface Folder {
  name: string;
  children: Folder[];
  isEditing?: boolean;
  isCreatingChild?: boolean;
  isOpen?: boolean; // NEW
  items?: string[]; // Optional: for files
}

@Component({
  selector: 'app-folder-item',
  templateUrl: './folder-item.component.html',
  styleUrls: ['./folder-item.component.css'],
})
export class FolderItemComponent {
  @ViewChild('newFolderInput') newFolderInput!: ElementRef<HTMLInputElement>;
  @Input() folder!: Folder;
  @Input() folderList!: Folder[];
  newFolderName = '';

  addChildFolder() {
    this.folder.isCreatingChild = true;
    this.newFolderName = '';
    setTimeout(() => {
      this.newFolderInput?.nativeElement.focus();
    }, 0);
  }

  saveChildFolder() {
    const name = this.newFolderName.trim();
    if (name) {
      this.folder.children.push({ name, children: [] });
    }
    this.folder.isCreatingChild = false;
    this.newFolderName = '';
  }

  cancelChildFolder() {
    const name = this.newFolderName.trim();
    if (name) {
      this.folder.children.push({ name, children: [] });
    }
    this.folder.isCreatingChild = false;
    this.newFolderName = '';
  }

  deleteFolder(folderList: Folder[], folderToDelete: Folder) {
    const index = folderList.indexOf(folderToDelete);
    if (index !== -1) {
      folderList.splice(index, 1);
    }
  }

  editFolder() {
    this.folder.isEditing = true;
    this.newFolderName = this.folder.name;
  }

  saveEdit() {
    const name = this.newFolderName.trim();
    if (name) {
      this.folder.name = name;
    }
    this.folder.isEditing = false;
  }

  cancelEdit() {
    this.folder.isEditing = false;
  }

  toggleFolder() {
    this.folder.isOpen = !this.folder.isOpen;
    if (this.folder.isOpen) {
      this.folder.items = ['a', 'b', 'c', 'd'];
    }
  }
}
