import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDescriptionPageRoutingModule } from './edit-description-routing.module';

import { EditDescriptionPage } from './edit-description.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditDescriptionPageRoutingModule
  ],
  declarations: [EditDescriptionPage]
})
export class EditDescriptionPageModule {}
