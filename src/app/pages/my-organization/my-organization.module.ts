import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyOrganizationRoutingModule } from './my-organization-routing.module';
import { HumanTaskComponent } from './components/human-task/human-task.component';
import { ProcessComponent } from './components/process/process.component';
import { ScheduleListComponent } from './components/schedule-list/schedule-list.component';
import { SolutionAreasComponent } from './components/solution-areas/solution-areas.component';
import { WorkflowsComponent } from './components/workflows/workflows.component';
import { WorkflowsExecutionComponent } from './components/workflows-execution/workflows-execution.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { ContactComponent } from './components/contact/contact.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { NavTabComponent } from './components/nav-tab/nav-tab.component';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { OrganizationDetailComponent } from './components/organization-detail/organization-detail.component';
import { OrgContacsComponent } from './components/org-contacs/org-contacs.component';
import { GeneralOverviewComponent } from './components/general-overview/general-overview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from '../shared/shared.module';
import { GroupNameDialogComponent } from './components/group-name-dialog/group-name-dialog.component';

@NgModule({
  declarations: [
    HumanTaskComponent,
    ProcessComponent,
    ScheduleListComponent,
    SolutionAreasComponent,
    WorkflowsComponent,
    WorkflowsExecutionComponent,
    OrganizationComponent,
    ContactComponent,
    NavTabComponent,
    OrganizationDetailComponent,
    OrgContacsComponent,
    GeneralOverviewComponent,
    GroupNameDialogComponent,
  ],
  imports: [
    CommonModule,
    MyOrganizationRoutingModule,
    FeatherModule.pick(allIcons),
    NgbModule,
    NgbNavModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    SharedModule,
  ],
})
export class MyOrganizationModule {}
