import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyMenuRoutingModule } from './my-menu-routing.module';
import { TeamTaskComponent } from './components/team-task/team-task.component';
import { MyTaskComponent } from './components/my-task/my-task.component';
import { CardsComponent } from './components/cards/cards.component';
import { TaskListDataComponent } from './components/task-list-data/task-list-data.component';
import { FeatherModule } from 'angular-feather';
import { HttpClientModule } from '@angular/common/http';

import { allIcons } from 'angular-feather/icons';
import { SideFormComponent } from './components/side-form/side-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TeamTaskComponent,
    MyTaskComponent,
    CardsComponent,
    TaskListDataComponent,
    SideFormComponent,
  ],
  imports: [
    CommonModule,
    MyMenuRoutingModule,
    FeatherModule.pick(allIcons),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AgGridModule,
    SharedModule,
  ]
})
export class MyMenuModule { }
