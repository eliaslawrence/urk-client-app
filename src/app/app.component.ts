import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Storage } from "@ionic/storage-angular";
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AuthenticateService } from './services/authenticate/authenticate.service';
import { Observable, Subscription } from 'rxjs';
import { StoreService } from './services/store/store.service';
import { UserService } from './services/user/user.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'Minha Loja', url: '/store', icon: 'storefront' },
    { title: 'Produtos', url: '/products', icon: 'grid' },
  ];

  constructor(private storage      : Storage,
              private splashScreen : SplashScreen,
              private authService  : AuthenticateService,
              private userService  : UserService,
              private storeService : StoreService,
              private screenOrientation: ScreenOrientation,
              private platform         : Platform,
              private navCtrl      : NavController) {    

    this.splashScreen.hide();
    this.navCtrl.navigateRoot('products');  
    if(this.platform.is('android') || this.platform.is('iphone')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
  }

  logout(){    
    this.storage.remove("userToken");
    this.navCtrl.navigateRoot('');
  }
}
