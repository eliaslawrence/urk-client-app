import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.page.html',
  styleUrls: ['./stores.page.scss'],
})
export class StoresPage implements OnInit {

  
  stores: Array<any> = []; 

  limit = 10;
  lastLength;
  searchAble = false;
  searchText = undefined;

  constructor(public navCtrl         : NavController,
              private storeService   : StoreService) {     
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getStores();
  }

  search(ev){
    // set val to the value of the searchbar
    this.searchText = ev.target.value.toLowerCase();
    this.getStores();
  }

  async getStores() {

    try {      
      // console.log(searchText); 
      this.stores = await this.storeService.search(this.limit,0,this.searchText);
      this.lastLength = this.stores.length;
      // console.log(this.products);            
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
    this.getStores();
    this.searchAble = false;
  }

  itemTapped(item) {      
    this.navCtrl.navigateForward('stores/store/' + item.id);
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      this.appendItems(this.limit);

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.stores.length == this.lastLength) {
        console.log('No More Data');
        // event.target.disabled = true;
      }
    }, 500);
  }

  async appendItems(number) {
    try {
      let newStores = await this.storeService.search(number,this.stores.length,this.searchText);
      this.stores = this.stores.concat(newStores);          
    } catch (error) {
      console.error(error);
      console.log("Não foi possível carregar o feed principal");
    } 
  }

}
