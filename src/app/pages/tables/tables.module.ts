import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { SharedModule } from '../shared/shared.module';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { LocalListComponent } from './components/local-list/local-list.component';

@NgModule({
  declarations: [ProductsComponent, LocalListComponent],
  imports: [
    CommonModule,
    TablesRoutingModule,
    SharedModule,
    FeatherModule.pick(allIcons),
  ],
})
export class TablesModule {}
