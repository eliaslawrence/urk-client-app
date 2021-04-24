import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuController, NavController, PopoverController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  id        : string;
  product   : any = {images: [], price: 0, name: '', description: '', cost: '', store: {}};

  completeDescription : Boolean = false;

  constructor(private route         : ActivatedRoute,
              private router        : Router,
              private productService: ProductService,
              private navCtrl       : NavController,
              private popoverController : PopoverController,
              public  menuCtrl      : MenuController) {    
    this.menuCtrl.enable(false);    
  }
  
  ngOnInit() {    
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);    
  }

  ngOnDestroy(){
    this.menuCtrl.enable(true);
  }

  ionViewWillEnter(){
    this.getProduct(this.id);
  }

  async getProduct(id: string){      
    try {
      this.product = await this.productService.findById(id); 
      console.log(this.product);  
    } catch (error) {
      console.error(error);
      console.log("Não foi possível carregar o feed principal");
    }
  }

  openStorePage() {      
    this.navCtrl.navigateForward('stores/store/' + this.product.store.id);
  }

  descriptionTapped() {
    this.completeDescription = !this.completeDescription;
  }

}
