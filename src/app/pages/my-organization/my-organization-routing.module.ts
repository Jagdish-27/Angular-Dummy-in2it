import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HumanTaskComponent } from './components/human-task/human-task.component';
import { ProcessComponent } from './components/process/process.component';
import { ScheduleListComponent } from './components/schedule-list/schedule-list.component';
import { WorkflowsComponent } from './components/workflows/workflows.component';
import { WorkflowsExecutionComponent } from './components/workflows-execution/workflows-execution.component';
import { SolutionAreasComponent } from './components/solution-areas/solution-areas.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { ContactComponent } from './components/contact/contact.component';
import { OrganizationDetailComponent } from './components/organization-detail/organization-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'organization', pathMatch: 'full' },
  { path: 'organization', component: OrganizationComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'human-task', component: HumanTaskComponent },
  { path: 'process', component: ProcessComponent },
  { path: 'schedule-list', component: ScheduleListComponent },
  { path: 'solution-areas', component: SolutionAreasComponent },
  { path: 'workflows', component: WorkflowsComponent },
  { path: 'workflows-execution', component: WorkflowsExecutionComponent },
  // { path: 'organization/:id', component: OrganizationDetailComponent }
  { path: 'organization/detail', component: OrganizationDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyOrganizationRoutingModule {}
