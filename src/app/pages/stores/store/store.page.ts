import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product/product.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  
  id:string;
  tab = "info";
  store:any = {};
  products:Array<any> = [];

  constructor(private router            : Router,
              private route             : ActivatedRoute,
              private storeService      : StoreService,
              private productService    : ProductService,
              private popoverController : PopoverController,
              private navCtrl           : NavController) {
  }

  ngOnInit() {    
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    // this.getStore();
  }

  ionViewWillEnter(){
    this.getStore(this.id);
  }

  async getStore(id) {
    try {
      this.store = await this.storeService.findById(id); 
      this.products = await this.productService.findByStore(this.store.id);      
      console.log(this.store);
    } catch (error) {
      console.log(error);
      console.log("Não foi possível carregar o feed principal");
    }         
  }  

  onScroll(event){
    var element = document.getElementById("segment-tab");

    if(event.detail.scrollTop > 200){
      element.classList.remove("hide-segment");      
    }else{
      element.classList.add("hide-segment");
    }
  }

  itemTapped(item) {      
    this.navCtrl.navigateForward('products/product/' + item.id);
  }

}