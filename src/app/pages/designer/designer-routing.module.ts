import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { WorkflowBuilderComponent } from './components/workflow-builder/workflow-builder.component';
import { ChartsComponent } from './components/charts/charts.component';

const routes: Routes = [
  {path:'form-builder',component:FormBuilderComponent},
  {path:'workflow-builder',component:WorkflowBuilderComponent},
  {path:'charts',component:ChartsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignerRoutingModule { }
