import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPhotosPage } from './edit-photos.page';

const routes: Routes = [
  {
    path: '',
    component: EditPhotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPhotosPageRoutingModule {}
