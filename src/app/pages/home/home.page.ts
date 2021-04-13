import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuController, NavController, Platform } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';
import { Storage } from "@ionic/storage-angular";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public folder: string;
  private user: any = {};
  private userForm : FormGroup;

  constructor(private activatedRoute   : ActivatedRoute,
              private formBuilder      : FormBuilder,
              private screenOrientation: ScreenOrientation,
              private platform         : Platform,
              private menuCtrl         : MenuController,
              private navCtrl          : NavController,
              private authService      : AuthenticateService) {  

    this.menuCtrl.enable(false);

    if(this.platform.is('android') || this.platform.is('iphone')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
                
    this.userForm = this.formBuilder.group({
      email:    ['', Validators.required],
      password: ['', Validators.required],
    });
  }  

  ngOnDestroy(){
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  
  async login() {    
    // this.storage.set('name', 'Elias');

    try {
      let res = await this.authService.signin(this.user);
      console.log(res);
      this.navCtrl.navigateRoot('store');
    } catch (error) {
      console.log(error); 
    }
  }

  signup(){
    this.navCtrl.navigateForward('/signup');
  }
  
}
