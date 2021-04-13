import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditTelephonePage } from './edit-telephone.page';

const routes: Routes = [
  {
    path: '',
    component: EditTelephonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditTelephonePageRoutingModule {}
