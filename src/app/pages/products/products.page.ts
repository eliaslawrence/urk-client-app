import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  products: Array<any> = []; 

  limit = 10;
  lastLength;
  searchAble = false;

  constructor(public navCtrl         : NavController,
              private productService : ProductService) {     
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getProducts();
  }

  private search(ev){
    // set val to the value of the searchbar
    let searchText = ev.target.value.toLowerCase();
    this.getProducts(searchText);
  }

  private async getProducts(searchText=undefined) {

    try {      
      // console.log(searchText); 
      this.products = await this.productService.search(this.limit,0,searchText);
      this.lastLength = this.products.length;
      // console.log(this.products);            
    } catch (error) {
      console.error(error);
      console.log("Não foi possível carregar o feed principal");
    } 

    //TODO: get products from DB (1)
    // this.products = [
    //   { productName: 'Bolo de Chocolate XYZ', code: '000054578/001', date: '2 de maio às 12:24', sales: true , type: 1, price: 5.99, qty: 200, unity: 'u', available: true , hasStock: false, deliverOptions: [{name: 'Loja', code: '1'}]                                    , paymentOptions: [{name: 'Dinheiro'  , code: '2'}], description: 'Bolo com recheio e cobertura de chocolate de raio de 10cm', imagesList: [{src: "assets/imgs/cake.jpg"}, {src: "assets/imgs/cake.jpg"}, {src: "https://www.tvgazeta.com.br/wp-content/uploads/2017/12/bolo.pelo_.amor_.YT_-1024x709.jpg"}, {src: "http://192.168.25.4:8887/volley.png"}]},
    //   { productName: 'Pastel de Queijo'     , code: '157054578/002', date: '3 de maio às 22:55', sales: false, type: 2, price: 5.99, qty: 200, unity: 'u', available: false, hasStock: false, deliverOptions: [{name: 'Domicílio', code: '2'}]                               , paymentOptions: [{name: 'Dinheiro'  , code: '2'}]                              , description: 'Bolo com recheio e cobertura de chocolate de raio de 10cm', imagesList: [{src: "assets/imgs/cake.jpg"}, {src: "assets/imgs/cake.jpg"}]},
    //   { productName: 'Bolo de Chocolate X'  , code: '000054578/001', date: '2 de maio às 12:24', sales: false, type: 1, price: 5.99, qty: 200, unity: 'u', available: false, hasStock: false, deliverOptions: [{name: 'Domicílio', code: '2'}]                               , paymentOptions: [{name: 'Aplicativo', code: '1'}]                              , description: 'Bolo com recheio e cobertura de chocolate de raio de 10cm', imagesList: [{src: "assets/imgs/cake.jpg"}]},
    //   { productName: 'Torta'                , code: '157054578/002', date: '3 de maio às 22:55', sales: false, type: 2, price: 5.99, qty: 200, unity: 'u', available: false, hasStock: false, deliverOptions: [{name: 'Loja'     , code: '1'}]                               , paymentOptions: [{name: 'Dinheiro'  , code: '2'}]                              , description: 'Bolo com recheio e cobertura de chocolate de raio de 10cm', imagesList: []},
    //   { productName: 'Coxinha'              , code: '000054578/001', date: '2 de maio às 12:24', sales: false, type: 2, price: 5.99, qty: 200, unity: 'u', available: true , hasStock: false, deliverOptions: [{name: 'Loja'     , code: '1'}]                               , paymentOptions: [{name: 'Dinheiro'  , code: '2'}]                              , description: 'Bolo com recheio e cobertura de chocolate de raio de 10cm', imagesList: [{src: "assets/imgs/cake.jpg"}, {src: "assets/imgs/cake.jpg"}]},
    //   { productName: 'Pizza de Calabresa'   , code: '157054578/002', date: '3 de maio às 22:55', sales: true , type: 1, price: 5.99, qty: 200, unity: 'u', available: true , hasStock: false, deliverOptions: [{name: 'Loja'     , code: '1'}]                               , paymentOptions: [{name: 'Aplicativo', code: '1'}]                              , description: 'Bolo com recheio e cobertura de chocolate de raio de 10cm', imagesList: [{src: "assets/imgs/cake.jpg"}]},
    //   { productName: 'Pizza de Mussarela'   , code: '000054578/001', date: '2 de maio às 12:24', sales: false, type: 1, price: 5.99, qty: 200, unity: 'u', available: false, hasStock: false, deliverOptions: [{name: 'Loja'     , code: '1'},{name: 'Domicílio', code: '2'}], paymentOptions: [{name: 'Aplicativo', code: '1'},{name: 'Dinheiro', code: '2'}], description: 'Bolo com recheio e cobertura de chocolate de raio de 10cm', imagesList: [{src: "assets/imgs/cake.jpg"}]},
    //   { productName: 'Pizza 4 Queijos'      , code: '157054578/002', date: '3 de maio às 22:55', sales: true , type: 2, price: 5.99, qty: 200, unity: 'u', available: false, hasStock: false, deliverOptions: [{name: 'Domicílio', code: '2'}]                               , paymentOptions: [{name: 'Dinheiro'  , code: '2'}]                              , description: 'Bolo com recheio e cobertura de chocolate de raio de 10cm', imagesList: [{src: "assets/imgs/cake.jpg"}, {src: "assets/imgs/cake.jpg"}]},
    //   { productName: 'Empadinha'            , code: '000054578/001', date: '2 de maio às 12:24', sales: false, type: 1, price: 5.99, qty: 200, unity: 'u', available: true , hasStock: false, deliverOptions: [{name: 'Loja'     , code: '1'},{name: 'Domicílio', code: '2'}], paymentOptions: [{name: 'Aplicativo', code: '1'},{name: 'Dinheiro', code: '2'}], description: 'Bolo com recheio e cobertura de chocolate de raio de 10cm', imagesList: [{src: "assets/imgs/cake.jpg"}, {src: "assets/imgs/cake.jpg"}, {src: "assets/imgs/cake.jpg"}]},
    // ];
    ///////////////////////////////////////////////////////////END (1)
  }

  private enableSearch() {      
    this.searchAble = true;
  }

  private cancel(){
    // Reset items back to all of the items
    this.getProducts();
    this.searchAble = false;
  }

  itemTapped(item) {      
    this.navCtrl.navigateForward('products/product/' + item.id);
    this.searchAble = false;
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
      let newProducts = await this.productService.search(number,this.products.length,undefined);
      this.products = this.products.concat(newProducts);          
    } catch (error) {
      console.error(error);
      console.log("Não foi possível carregar o feed principal");
    } 
  }

}
