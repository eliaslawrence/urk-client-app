import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditVariablePageRoutingModule } from './edit-variable-routing.module';

import { EditVariablePage } from './edit-variable.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditVariablePageRoutingModule
  ],
  declarations: [EditVariablePage]
})
export class EditVariablePageModule {}
