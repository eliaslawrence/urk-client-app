import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product/product.service';
import { ProductImageService } from 'src/app/services/product/productImage/product-image.service';
import { AddPhotoComponent } from 'src/app/components/add-photo/add-photo/add-photo.component';

@Component({
  selector: 'app-edit-photos',
  templateUrl: './edit-photos.page.html',
  styleUrls: ['./edit-photos.page.scss'],
})
export class EditPhotosPage implements OnInit {

  private product          : any;
  private imgSelectedIndex : number = -1;
  url = 'http://192.168.15.5:1337/image/findById/';

  constructor(private router : Router,
              private route  : ActivatedRoute,
              // private platform: Platform,
              // private requestProvider: RequestProvider,
              // private loadingCtrl: LoadingController,
              // private toastCtrl: ToastController,
              private productService      : ProductService,
              private productImageService : ProductImageService,
              public popoverController    : PopoverController
              ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {    
        this.product = this.router.getCurrentNavigation().extras.state.product;  
      }
    });

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

  async addPhoto(){
    const popover = await this.popoverController.create({
      component: AddPhotoComponent,
      componentProps: {product: this.product},
      showBackdrop: true,
      cssClass: 'custom-popover'
    });    

    popover.onDidDismiss().then((data) => {
      console.log(data);
      if(data.data){
        this.productService.addImage(this.product.id, {file:data.data}).then(()=>{
          this.getProduct(this.product.id);
        }).catch((error)=>{
          console.log(error);
        });    
      }           
    }).catch((error)=>{
      console.log(error);
    });

    return await popover.present();    
  }

  private imageSelected(index){
    this.product.images[index].selected = !this.product.images[index].selected;
    if(this.imgSelectedIndex != -1){
      this.product.images[this.imgSelectedIndex].selected = false;
    }

    if(this.product.images[index].selected){
      this.imgSelectedIndex = index;
      // this.presentToast(this.product.images[index].src);
    }else{
      this.imgSelectedIndex = -1;
    }
  }

  private async deleteImage(index){
    try {
      await this.productImageService.remove({productImage: {product: this.product.id, image: this.product.images[index].id}});
      this.imgSelectedIndex = -1;
      await this.getProduct(this.product.id); 
    } catch (error) {
      console.error(error);
    }
  }
}
