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

  limit = 10;
  lastLength;
  searchText = undefined;
  searchAble = false;

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
    this.getStore();
  }

  async getStore() {
    try {
      this.store = await this.storeService.findById(this.id); 
      this.products = await this.productService.findByStore(this.store.id, this.limit, 0, this.searchText);      
      console.log(this.store);
    } catch (error) {
      console.log(error);
      console.log("Não foi possível carregar o feed principal");
    }         
  }  

  async getProducts() {
    try {
      this.products = await this.productService.findByStore(this.id, this.limit, 0, this.searchText);    
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

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      this.appendItems(this.limit);

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.products.length == this.lastLength) {
        console.log('No More Data');
        // event.target.disabled = true;
      }
    }, 500);
  }

  async appendItems(number) {
    try {
      let newProducts = await this.productService.findByStore(this.store.id, number, this.products.length, this.searchText);
      this.products = this.products.concat(newProducts);          
    } catch (error) {
      console.error(error);
      console.log("Não foi possível carregar o feed principal");
    } 
  }

  enableSearch() {      
    this.searchAble = true;
  }

  cancel(){
    // Reset items back to all of the items
    this.searchText = undefined;
    this.getProducts();
    this.searchAble = false;
  }

  search(ev){
    // set val to the value of the searchbar
    this.searchText = ev.target.value.toLowerCase();
    this.getProducts();
  }

}