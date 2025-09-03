import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { CustomTaskComponent } from './components/custom-task/custom-task.component';
import { OrganizationSettingsComponent } from './components/organization-settings/organization-settings.component';
import { FolderTreeComponent } from './components/folder-tree/folder-tree.component';
import { FolderItemComponent } from './components/folder-item/folder-item.component';
import { FormsModule } from '@angular/forms';
import { VisNetworkComponent } from './components/vis-network/vis-network.component';

@NgModule({
  declarations: [
    CustomTaskComponent,
    OrganizationSettingsComponent,
    FolderTreeComponent,
    FolderItemComponent,
    VisNetworkComponent,
  ],
  imports: [CommonModule, SettingsRoutingModule, FormsModule],
})
export class SettingsModule {}
