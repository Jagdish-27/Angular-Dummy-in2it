import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignerRoutingModule } from './designer-routing.module';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { WorkflowBuilderComponent } from './components/workflow-builder/workflow-builder.component';
import { ChartsComponent } from './components/charts/charts.component';
import { ViaSourceChartComponent } from './components/via-source-chart/via-source-chart.component';
import { CertaintyComponent } from './components/certainty/certainty.component';
import { FunnelChartComponent } from './components/funnel-chart/funnel-chart.component';

import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';


@NgModule({
  declarations: [
    FormBuilderComponent,
    WorkflowBuilderComponent,
    ChartsComponent,
    ViaSourceChartComponent,
    CertaintyComponent,
    FunnelChartComponent
  ],
  imports: [
    CommonModule,
    DesignerRoutingModule,
    FeatherModule,
    FeatherModule.pick(allIcons),
  ]
})
export class DesignerModule { }
