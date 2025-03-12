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
import { TreeComponent } from './components/tree/tree.component';
import { CommentComponent } from './components/comment/comment.component';
import { MenuComponent } from './components/menu/menu.component';
import { SearchComponent } from './components/search/search.component';
import { HighlighSearchPipe } from 'src/app/pipes/highligh-search.pipe';

@NgModule({
  declarations: [
    TeamTaskComponent,
    MyTaskComponent,
    CardsComponent,
    TaskListDataComponent,
    SideFormComponent,
    TreeComponent,
    CommentComponent,
    MenuComponent,
    SearchComponent,
    HighlighSearchPipe,
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
  ],
})
export class MyMenuModule {}
