import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMoneyPageRoutingModule } from './edit-money-routing.module';

import { EditMoneyPage } from './edit-money.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditMoneyPageRoutingModule
  ],
  declarations: [EditMoneyPage]
})
export class EditMoneyPageModule {}
