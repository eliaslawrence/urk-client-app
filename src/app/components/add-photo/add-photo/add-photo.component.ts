import { Component, OnInit } from '@angular/core';
import { NavParams, Platform, PopoverController } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from "@ionic-native/file/ngx";
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';

const TOKEN_KEY = 'userToken';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss'],
})
export class AddPhotoComponent implements OnInit {

  private data;  

  constructor(private popCtrl  : PopoverController,
              private platform : Platform,
              private file     : File,
              private transfer : FileTransfer,
              private navParams: NavParams,
              private storage  : Storage,
              private camera   : Camera) {
  }

  ngOnInit() {}

  private openCamera(){
    this.takePicture(this.camera.PictureSourceType.CAMERA);
  }
  
  private openGallery(){
    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
  }

  private async takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    try {
      let imageData = await this.camera.getPicture(options);
      console.log('imageData');
      console.log(imageData);
      let fileName = this.createFileName();
        
      await this.upload(imageData, fileName);
      this.close();
    } catch (error) {
      console.log(error);
    }    
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName =  n + ".jpg";
    return newFileName;
  }
  
  private async upload(fileSrc, fileName){   

    try {
      let token = await this.storage.get(TOKEN_KEY);
    
      var options = {
        fileKey: "image",
        fileName: fileName,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        headers: {
          Authorization: `bearer ${token}`
        }
      };

      const fileTransfer: FileTransferObject = this.transfer.create();

      this.data = await fileTransfer.upload(fileSrc, environment.urlServer + 'image/upload', options);
      console.log(this.data);
      this.data = JSON.parse(this.data.response)
      console.log(this.data);          
    } catch (error) {
      console.log(error);
    }       
  }

  close() {
    console.log("close");
    this.popCtrl.dismiss(this.data);
  }

}
