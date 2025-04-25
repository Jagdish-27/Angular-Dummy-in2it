import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamTaskComponent } from './components/team-task/team-task.component';
import { MyTaskComponent } from './components/my-task/my-task.component';

const routes: Routes = [
  { path: '', redirectTo: 'my-task', pathMatch: 'full' },
  { path: 'my-task', component: MyTaskComponent },
  { path: 'team-task', component: TeamTaskComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyMenuRoutingModule {}
