import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductPageRoutingModule } from './product-routing.module';

import { ProductPage } from './product.page';

import { Camera } from '@ionic-native/camera/ngx';
import { File } from "@ionic-native/file/ngx";
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductPageRoutingModule
  ],
  declarations: [ProductPage],
  providers: [
    Camera,
    File,
    FileTransfer
  ]
})
export class ProductPageModule {}
