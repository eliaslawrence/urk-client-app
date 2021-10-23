import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  
  loading;
  isLoading = false;

  constructor(private loadingCtrl: LoadingController) {
  }

  async showLoading(message){
    if(message){
      this.loading = await this.loadingCtrl.create({message: message});
      await this.loading.present();
    }    
  }

  async dismissLoading(){
    if(this.loading){
      await this.loading.dismiss();
    }    
  }
}
