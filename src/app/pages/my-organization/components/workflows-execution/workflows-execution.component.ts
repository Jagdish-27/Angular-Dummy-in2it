import { Component, OnInit } from '@angular/core';

enum DragOperationTypes {
  None,
  Shape,
}

interface TopologyItem {
  id: number;
  name: string;
  x: number;
  y: number;
  showDevice?: boolean;
  rect?: { x: number; y: number; width: number; height: number };
  cross?: { x: number; y: number };
  z_end?: { x: number; y: number; connect_with: string };
  isGroup?: boolean;
  groupId?: number;
  children?: TopologyItem[];
  visible?: boolean;
  selected?: boolean;
  isExpanded?: boolean;
}

@Component({
  selector: 'app-workflows-execution',
  templateUrl: './workflows-execution.component.html',
  styleUrls: ['./workflows-execution.component.css'],
})
export class WorkflowsExecutionComponent implements OnInit {
  mainWidth!: number;
  mainHeight!: number;

  dragOperationType: DragOperationTypes = DragOperationTypes.None;
  selectedElement: TopologyItem | null = null;
  sX = 0;
  sY = 0;
  groupCounter = 1;

  topologyDetails = {
    topologyItems: [] as TopologyItem[],
  };

  showGroupDialog = false;

  ngOnInit(): void {
    this.mainWidth = window.innerWidth;
    this.mainHeight = window.innerHeight;

    this.topologyDetails.topologyItems = [
      { id: 1, name: 'Site A', x: 100, y: 100, visible: true },
      { id: 2, name: 'Site B', x: 300, y: 150, visible: true },
      { id: 3, name: 'Site C', x: 200, y: 300, visible: true },
      { id: 4, name: 'Site D', x: 400, y: 250, visible: true },
    ];
  }

  get selectedItems(): TopologyItem[] {
    return this.topologyDetails.topologyItems.filter((item) => item.selected);
  }

  toggleSelection(item: TopologyItem, event: Event): void {
    event.stopPropagation();
    item.selected = !item.selected;
  }

  pointerDown(item: TopologyItem, event: MouseEvent | any): void {
    if (!item.selected) return;
    this.selectedElement = item;
    this.sX = event.layerX;
    this.sY = event.layerY;
    this.dragOperationType = DragOperationTypes.Shape;
    event.stopPropagation();
  }

  move(event: MouseEvent | any): void {
    if (
      this.dragOperationType !== DragOperationTypes.Shape ||
      !this.selectedItems.length
    )
      return;

    event.preventDefault();
    const deltaX = event.layerX - this.sX;
    const deltaY = event.layerY - this.sY;

    this.selectedItems.forEach((item) => {
      item.x += deltaX;
      item.y += deltaY;
    });

    this.sX = event.layerX;
    this.sY = event.layerY;
  }

  up(): void {
    this.dragOperationType = DragOperationTypes.None;
    this.selectedElement = null;
  }

  clearSelection(): void {
    this.topologyDetails.topologyItems.forEach(
      (item) => (item.selected = false)
    );
  }

  openGroupDialog(): void {
    if (this.selectedItems.length <= 1) return;
    this.showGroupDialog = true;
  }

  handleGroupName(groupName: string): void {
    this.showGroupDialog = false;
    this.createGroup(groupName);
  }

  createGroup(groupName: string): void {
    const groupId = this.groupCounter++;
    const avgX =
      this.selectedItems.reduce((sum, i) => sum + i.x, 0) /
      this.selectedItems.length;
    const avgY =
      this.selectedItems.reduce((sum, i) => sum + i.y, 0) /
      this.selectedItems.length;

    const children = this.selectedItems.map((item) => ({ ...item }));

    this.topologyDetails.topologyItems =
      this.topologyDetails.topologyItems.filter(
        (item) => !this.selectedItems.includes(item)
      );

    const groupItem: TopologyItem = {
      id: Date.now(),
      name: groupName,
      x: avgX,
      y: avgY,
      isGroup: true,
      groupId,
      visible: true,
      children,
    };

    this.topologyDetails.topologyItems.push(groupItem);
    this.selectedItems.length = 0;
  }

  toggleGroup(group: TopologyItem): void {
    if (!group.children) return;

    if (!group.isExpanded) {
      // EXPAND the group
      group.isExpanded = true;

      group.children.forEach((child) => {
        child.visible = true;
        child.groupId = group.groupId;
        this.topologyDetails.topologyItems.push(child);
      });

      group.visible = false;
    } else {
      // COLLAPSE the group
      this.topologyDetails.topologyItems =
        this.topologyDetails.topologyItems.filter(
          (item) => item.groupId !== group.groupId || item.isGroup
        );

      group.isExpanded = false;
      group.visible = true;
    }
  }

  getGroupBoundingBox(group: TopologyItem): {
    x: number;
    y: number;
    width: number;
    height: number;
  } {
    if (!group.children || group.children.length === 0) {
      return { x: group.x - 40, y: group.y - 25, width: 80, height: 50 };
    }

    const padding = 30;

    const xs = group.children.map((child) => child.x);
    const ys = group.children.map((child) => child.y);

    const minX = Math.min(...xs) - padding;
    const maxX = Math.max(...xs) + padding;
    const minY = Math.min(...ys) - padding;
    const maxY = Math.max(...ys) + padding;

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  }
}
