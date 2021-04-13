import { Component, Inject, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AddPhotoComponent } from 'src/app/components/add-photo/add-photo/add-photo.component';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  private store:any = {};

  url1 = "http://192.168.15.5:1337/image/findById/";
  url  = "192.168.15.5:1337/uploads/2a96f0e5-9a27-475e-a1ba-64c8771594b1.jpg";
  imageURL;

  constructor(private router            : Router,
              private storeService      : StoreService,
              private popoverController : PopoverController,
              private navCtrl           : NavController) {
  }

  ngOnInit() {    
    // this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.id);
    // this.getStore();
  }

  ionViewWillEnter(){
    this.getStore();//this.id);
  }

  private async getStore() {
    try {
      this.store = await this.storeService.findByUser();      
      console.log(this.store);
    } catch (error) {
      console.log(error);
      console.log("Não foi possível carregar o feed principal");

      this.store = {
        image: {src: 'assets/imgs/loja.jpg', name: 'cover.jpg'},
        categories: [{name: 'Alimentos', code: '1'},
          {name: 'Variados' , code: '2'}],
        paymentOptions: [
          {name: 'Dinheiro', code: '2'},
          {name: 'Crédito' , code: '3'}
        ],
        storeType: {name: 'Pronta entrega', code: '1'},
        name: 'Lojinha do Sr. Raimundo',
        accountName: 'lojinhadoraimundo',
        telephones: [
          '21 22222222',
        ],
        daysOfTheWeek: [
          {name: 'Domingo', selected: false, openingHour: '08:00', closingHour: '16:00'},
          {name: 'Segunda', selected: true , openingHour: '08:00', closingHour: '16:00'},
          {name: 'Terça'  , selected: true , openingHour: '08:00', closingHour: '16:00'},
          {name: 'Quarta' , selected: false, openingHour: '08:00', closingHour: '16:00'},
          {name: 'Quinta' , selected: false, openingHour: '08:00', closingHour: '16:00'},
          {name: 'Sexta'  , selected: true , openingHour: '08:00', closingHour: '16:00'},
          {name: 'Sábado' , selected: false, openingHour: '08:00', closingHour: '16:00'}],
        address: {
            cep          : '24220380',
            address      : 'Rua Geraldo Martins',
            number       : '75',
            complement   : '403',
            neighborhood : 'Icaraí',
            city         : 'Niterói',
            state        : 'Rio de Janeiro',
            country      : 'Brasil',
            placeID      : ''
          }
      };
    }    
  }  

  private editItem(name, pageTitle, item = undefined) {
    let navigationExtras: NavigationExtras = {
      state : {
        conduct   : item,
        name      : name,
        pageTitle : pageTitle,
        patientId : this.store.id
      }      
    };
    
    this.router.navigate(['store/edit-item'], navigationExtras);
  }

  editAddress() {       
    let navigationExtras: NavigationExtras = {
      state : {
        address   : this.store.address,
        name      : 'address',
        pageTitle : 'Endereço',
        storeId   : this.store.id
      }      
    };
    
    this.router.navigate(['store/edit-address'], navigationExtras);
  }

  editTelephone(telephone) {    
    let navigationExtras: NavigationExtras = {
      state : {
        item      : telephone,
        name      : 'telephones',
        pageTitle : 'Telefone',
        storeId   : this.store.id
      }      
    };
    
    this.router.navigate(['store/edit-telephone'], navigationExtras);
  }

  editVariable(name, pageTitle, variable, routingPage = 'edit-variable') {
    let navigationExtras: NavigationExtras = {
      state : {
        storeId   : this.store.id,
        name      : name     ,
        pageTitle : pageTitle,
        variable  : variable
      }
    };      
    
    this.router.navigate(['store/'+routingPage], navigationExtras);
  }

  async addPhoto(){
    const popover = await this.popoverController.create({
      component: AddPhotoComponent,
      componentProps: {store: this.store},
      showBackdrop: true,
      cssClass: 'custom-popover'
    });   
    
    popover.onDidDismiss().then((data) => {
      console.log(data);
      if(data.data){
        this.storeService.updateImage({file:data.data}).then(()=>{
          this.getStore();
        }).catch((error)=>{
          console.log(error);
        }); 
      }         
    }).catch((error)=>{
      console.log(error);
    }); 

    await popover.present();
  }

}
