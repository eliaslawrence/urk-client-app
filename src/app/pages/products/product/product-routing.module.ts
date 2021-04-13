import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductPage } from './product.page';

const routes: Routes = [
  {
    path: '',
    component: ProductPage
  },
  {
    path: 'edit-variable',
    loadChildren: () => import('./edit-variable/edit-variable.module').then( m => m.EditVariablePageModule)
  },
  {
    path: 'edit-money',
    loadChildren: () => import('./edit-money/edit-money.module').then( m => m.EditMoneyPageModule)
  },
  {
    path: 'edit-description',
    loadChildren: () => import('./edit-description/edit-description.module').then( m => m.EditDescriptionPageModule)
  },
  {
    path: 'edit-photos',
    loadChildren: () => import('./edit-photos/edit-photos.module').then( m => m.EditPhotosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductPageRoutingModule {}
