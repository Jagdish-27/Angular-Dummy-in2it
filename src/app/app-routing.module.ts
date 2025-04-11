import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'my-menu/my-task', pathMatch: 'full' },
  {
    path: 'my-menu',
    loadChildren: () =>
      import('./pages/my-menu/my-menu.module').then((m) => m.MyMenuModule),
  },
  {
    path: 'my-organization',
    loadChildren: () =>
      import('./pages/my-organization/my-organization.module').then(
        (m) => m.MyOrganizationModule
      ),
  },
  {
    path: 'designer',
    loadChildren: () =>
      import('./pages/designer/designer.module').then((m) => m.DesignerModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./pages/settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'tables',
    loadChildren: () =>
      import('./pages/tables/tables.module').then((m) => m.TablesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
