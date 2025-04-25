import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { AgGridTableComponent } from './ag-grid-table/ag-grid-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { CustomButtonsComponent } from './cell-renders/custom-buttons/custom-buttons.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { LinkButtonComponent } from './cell-renders/link-button/link-button.component';
import { InputEditComponent } from './cell-renders/input-edit/input-edit.component';
import { FormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AngularCalenderComponent } from './angular-calender/angular-calender.component';
import { StatusRendererComponent } from './cell-renders/status-renderer/status-renderer.component';
import { SingleSelectDropdownComponent } from './single-select-dropdown/single-select-dropdown.component';
import { MultiSelectDropdownComponent } from './multi-select-dropdown/multi-select-dropdown.component';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AppCustomDirective } from './directives/app-custom.directive';
import { PasswordValidatorDirective } from './directives/password-validator.directive';
import { AutofocusDirective } from './directives/autofocus.directive';
import { LazyLoadDirective } from './directives/lazy-load.directive';
import { DraggableDirective } from './directives/draggable.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { ReadKeyPipe } from './pipes/read-key.pipe';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { HighlightSearchDirective } from './directives/highlight-search.directive';
import { TooltipDirective } from './directives/tooltip.directive';
import { DisableRightClickDirective } from './directives/disable-right-click.directive';
import { TimeAgoDirective } from './directives/time-ago.directive';
import { CopyToClipboardDirective } from './directives/copy-to-clipboard.directive';

@NgModule({
  declarations: [
    AgGridTableComponent,
    CustomButtonsComponent,
    LinkButtonComponent,
    InputEditComponent,
    ErrorComponent,
    AngularCalenderComponent,
    StatusRendererComponent,
    SingleSelectDropdownComponent,
    MultiSelectDropdownComponent,
    AppCustomDirective,
    PasswordValidatorDirective,
    AutofocusDirective,
    LazyLoadDirective,
    DraggableDirective,
    ClickOutsideDirective,
    InfiniteScrollDirective,
    ReadKeyPipe,
    BreadcrumbComponent,
    HighlightSearchDirective,
    TooltipDirective,
    DisableRightClickDirective,
    TimeAgoDirective,
    CopyToClipboardDirective,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    AgGridModule,
    FeatherModule.pick(allIcons),
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  exports: [
    AgGridTableComponent,
    ErrorComponent,
    AngularCalenderComponent,
    SingleSelectDropdownComponent,
    MultiSelectDropdownComponent,
    AppCustomDirective,
    PasswordValidatorDirective,
    AutofocusDirective,
    LazyLoadDirective,
    DraggableDirective,
    ClickOutsideDirective,
    InfiniteScrollDirective,
    ReadKeyPipe,
    BreadcrumbComponent,
    HighlightSearchDirective,
    TooltipDirective,
    DisableRightClickDirective,
    TimeAgoDirective,
    CopyToClipboardDirective,
  ],
})
export class SharedModule {}
