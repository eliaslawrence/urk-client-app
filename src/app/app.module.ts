import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';

//START: Module
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"; // HTTP
import { IonicStorageModule } from '@ionic/storage-angular';
//END: Module

//START: Provider
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { TokenInterceptorService } from './services/token-interceptor/token-interceptor.service';
//END: Provider

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,    
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    ScreenOrientation,
    SplashScreen,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    TokenInterceptorService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
