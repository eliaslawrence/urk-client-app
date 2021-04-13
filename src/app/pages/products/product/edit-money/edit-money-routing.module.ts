import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditMoneyPage } from './edit-money.page';

const routes: Routes = [
  {
    path: '',
    component: EditMoneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditMoneyPageRoutingModule {}
