import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SideNavToolComponent } from './components/side-nav-tool/side-nav-tool.component';

import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

// import { AgGridModule } from 'ag-grid-angular';
// import { AgGridTableComponent } from './components/ag-grid-table/ag-grid-table.component';

// import { AmChartsModule } from '@amcharts/amcharts4-angular';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    SideNavToolComponent,
    // AgGridTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FeatherModule.pick(allIcons),
    // AgGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
