import { NgModule } from '@angular/core';
import { PreloadingStrategy, RouterModule, Routes } from '@angular/router';
import { CustomPreloadingStrategies } from './config/custom-preloading-strategies';

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
    data: { preload: false, title: 'Settings', delay: false },
  },
  {
    path: 'tables',
    loadChildren: () =>
      import('./pages/tables/tables.module').then((m) => m.TablesModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      preloadingStrategy: CustomPreloadingStrategies,
    }),
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [
    { provide: PreloadingStrategy, useClass: CustomPreloadingStrategies },
  ],
})
export class AppRoutingModule {}
