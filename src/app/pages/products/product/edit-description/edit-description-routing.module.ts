import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDescriptionPage } from './edit-description.page';

const routes: Routes = [
  {
    path: '',
    component: EditDescriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDescriptionPageRoutingModule {}
