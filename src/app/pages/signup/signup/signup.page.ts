import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  address: any;
  storeAddress: any;
  inputForm : any;
  componentForm : any;
  monthNames: Array<string>;
  monthShortNames: Array<string>;

  masks: any;
  phoneNumber: any = "";
  cardNumber: any = "";
  cardExpiry: any = "";
  orderCode: any = "";
  cpf: any = "";
  user: any = {}; // = {name: "", email: "", cpf: "", phoneNumber: "", birthDate: "", gender: ""};
  employee: any = {}; 
  client: any = {};
  requestBody: any = {};

  signupForm: FormGroup;

  constructor(public navCtrl: NavController,
              private authService: AuthenticateService, 
              public formBuilder: FormBuilder) { 
              
    this.signupForm = formBuilder.group({
      name: ['', Validators.required],
      // phoneNumber: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      password2: ['', Validators.compose([Validators.required, this.customValidator(this.user)])],
      // birthDate: ['', Validators.required],
      // gender: ['', Validators.required],      
      // cpf: ['', Validators.required],      
    });

    this.monthNames = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro"
    ];
    this.monthShortNames = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez"
    ];
  }

  ngOnInit(): void {
  }


  private customValidator(user): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value !== user.password) {
            console.log(user.password);
            return { 'isEqual': true };
        }
        return null;
    };
  }


  async save(){   
      console.log(this.user);
      console.log(this.employee);
      console.log(this.signupForm.controls);

      if(!this.signupForm.valid){
        console.error(this.getErrorMsg());
        // this.sys.presentToast(this.getErrorMsg());
      }else{        
        this.fillRequest();
        try {
          let res = await this.authService.signup(this.requestBody)        
          console.log(res);
          this.navCtrl.navigateRoot('store');
        } catch (error) {
          console.error(error); 

          if(error.error.code === 'E_VALIDATION'){
            console.log('validation'); 
            // this.sys.presentToast('Email já cadastrado');              
          } else {
            // this.sys.presentToast('Ocorreu um erro ao efetuar o cadastro');
          }  
        }
      }        

  }

  getErrorMsg(){
    const controls = this.signupForm.controls;      

    if(controls.name.invalid){
      return "Campo nome obrigatório"
    } else if (controls.email.invalid) {
      return "E-mail inválido"
    } else if (controls.password.invalid) {
      return "A senha não pode conter menos de 6 caracteres."
    } else if (controls.password2.invalid) {
      return "Senhas divergentes"
    // } else if (controls.phoneNumber.invalid) {
      // return "Telefone inválido"
    // } else if (controls.birthDate.invalid) {
      // return "Data de nascimento inválida"
    // } else if (controls.gender.invalid) {
      // return "Gênero não inserido"
    // } else if (controls.cpf.invalid) {
      // return "CPF inválido"
    } else {
      return "Verifique os campos preenchidos"
    }
  }

  private fillRequest() {
    this.requestBody.user     = this.user;
    this.requestBody.employee = this.employee;
  }

}
