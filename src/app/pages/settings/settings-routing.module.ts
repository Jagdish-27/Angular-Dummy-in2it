import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomTaskComponent } from './components/custom-task/custom-task.component';
import { OrganizationSettingsComponent } from './components/organization-settings/organization-settings.component';

const routes: Routes = [
  { path: '', redirectTo: 'custom-task', pathMatch: 'full' },
  { path: 'custom-task', component: CustomTaskComponent },
  { path: 'organization-settings', component: OrganizationSettingsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
