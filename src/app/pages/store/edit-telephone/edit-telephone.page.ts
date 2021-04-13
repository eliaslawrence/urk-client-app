import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TelephoneService } from 'src/app/services/telephone/telephone.service';

@Component({
  selector: 'app-edit-telephone',
  templateUrl: './edit-telephone.page.html',
  styleUrls: ['./edit-telephone.page.scss'],
})
export class EditTelephonePage implements OnInit {

  storeForm : FormGroup;
  submitAttempt: boolean;

  pageTitle: string;
  private name: string;
  isNumber: boolean;

  private index: number;
  newItem: boolean;
  itemFocus: boolean;

  private item;
  private storeId: string;

  constructor(private route            : ActivatedRoute,
              private router           : Router,
              public navCtrl           : NavController, 
              private telephoneService : TelephoneService,
              private formBuilder      : FormBuilder) { 

  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {        
        this.name      = this.router.getCurrentNavigation().extras.state.name;
        this.pageTitle = this.router.getCurrentNavigation().extras.state.pageTitle;
        this.item      = this.router.getCurrentNavigation().extras.state.item;        
        this.storeId   = this.router.getCurrentNavigation().extras.state.storeId;


        if(this.item){
          this.storeForm = this.formBuilder.group({      
            number: [this.item.number, Validators.compose([Validators.required])],
          });          
        }else{
          this.newItem = true;

          this.storeForm = this.formBuilder.group({      
            number: ['', Validators.compose([Validators.required])],
          });
        }
      }
    });        

  }

  deleteItem(){
    this.submitAttempt = true;
    this.delete();
  }

  saveItem(){
    this.submitAttempt = true;

    if(this.storeForm.controls.number.valid){
      this.setItem(this.storeForm.value);
    }
  }

  private setItem(value){    
    if(this.newItem){
      this.add(value);
    } else {
      this.save(value);
    }   
  }

  private async add(newVariableJSON){    
    try {
      await this.telephoneService.create(this.storeId, newVariableJSON);
      this.navCtrl.pop();
    } catch (error) {
      console.log(error);
      console.log("Não foi possível carregar o feed principal");
    }     
  }

  private async save(variableJSON){    
    try {
      await this.telephoneService.updateAttribute(this.item.id, variableJSON);
      this.navCtrl.pop();
    } catch (error) {
      console.log(error);
      console.log("Não foi possível carregar o feed principal");
    }     
  }

  private async delete(){    
    try {
      await this.telephoneService.delete(this.item.id);
      this.navCtrl.pop();
    } catch (error) {
      console.log(error);
      console.log("Não foi possível carregar o feed principal");
    }     
  }

}
