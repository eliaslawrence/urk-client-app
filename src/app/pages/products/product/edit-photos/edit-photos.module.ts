import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Camera } from '@ionic-native/camera/ngx';
import { File } from "@ionic-native/file/ngx";
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

import { EditPhotosPageRoutingModule } from './edit-photos-routing.module';

import { EditPhotosPage } from './edit-photos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPhotosPageRoutingModule
  ],
  declarations: [EditPhotosPage],
  providers: [
    Camera,
    File,
    FileTransfer
  ]
})
export class EditPhotosPageModule {}
