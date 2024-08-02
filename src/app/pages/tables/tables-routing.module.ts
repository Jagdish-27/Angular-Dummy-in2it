import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { LocalListComponent } from './components/local-list/local-list.component';

const routes: Routes = [
  {path:'products',component:ProductsComponent},
  {path:'products/local-list',component:LocalListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule { }
