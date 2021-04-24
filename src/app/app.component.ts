import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Storage } from "@ionic/storage-angular";
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AuthenticateService } from './services/authenticate/authenticate.service';
import { Observable, Subscription } from 'rxjs';
import { StoreService } from './services/store/store.service';
import { UserService } from './services/user/user.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  lastIndex = 0;

  public appPages = [
    { url: '/products', outline: '', icon: 'bag-handle' },
    { url: '/stores', outline: '-outline', icon: 'storefront' },    
  ];

  constructor(private storage          : Storage,
              private splashScreen     : SplashScreen,
              private authService      : AuthenticateService,
              private userService      : UserService,
              private storeService     : StoreService,
              private screenOrientation: ScreenOrientation,
              private platform         : Platform,
              private statusBar        : StatusBar,
              private navCtrl          : NavController) {    

    this.splashScreen.hide();
    this.navCtrl.navigateRoot('products');  
    this.statusBar.backgroundColorByHexString("#4ec77e");
  }

  itemTapped(index){
    if(index != this.lastIndex){
      this.appPages[index].outline = '';
      this.appPages[this.lastIndex].outline = '-outline';
      this.lastIndex = index;
    }    
    this.navCtrl.navigateRoot(this.appPages[index].url);
  }
}
