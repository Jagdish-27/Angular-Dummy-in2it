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
import { PaginationLogicComponent } from './components/pagination-logic/pagination-logic.component';
import { SideFormComponent } from './components/side-form/side-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TeamTaskComponent,
    MyTaskComponent,
    CardsComponent,
    TaskListDataComponent,
    PaginationLogicComponent,
    SideFormComponent,
  ],
  imports: [
    CommonModule,
    MyMenuRoutingModule,
    FeatherModule.pick(allIcons),
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class MyMenuModule { }
