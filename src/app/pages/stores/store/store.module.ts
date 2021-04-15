import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StorePageRoutingModule } from './store-routing.module';

import { StorePage } from './store.page';

// Providers
import { Camera } from '@ionic-native/camera/ngx';
import { File } from "@ionic-native/file/ngx";
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StorePageRoutingModule
  ],
  declarations: [StorePage],
  providers: [
    Camera,
    File,
    FileTransfer
  ]
})
export class StorePageModule {}
