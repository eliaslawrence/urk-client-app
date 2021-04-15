import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditVariablePage } from './edit-variable.page';

const routes: Routes = [
  {
    path: '',
    component: EditVariablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditVariablePageRoutingModule {}
