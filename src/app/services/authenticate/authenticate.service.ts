import { Injectable } from '@angular/core';
import { RequestService } from '../request/request.service';
import { Storage } from "@ionic/storage-angular";
import { BehaviorSubject } from 'rxjs';

const BASE_URI = 'auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  private user: any = {};
  private userSubject$ = new BehaviorSubject<any>(this.user);
  userChanged$ = this.userSubject$.asObservable();

  constructor(private requestService: RequestService,
              private storage: Storage) {
  }

  //login
  async signin(user) : Promise<any>{
    let uri = BASE_URI +'login/';
    return await this.post(uri, user, "Autenticando...");
  }

  //signup
  async signup(newUser) : Promise<any>{
    let uri = BASE_URI +'signup/';      
    return await this.post(uri, newUser, "Criando cadastro...");
  }  

  private async post(url, body, message) {  
    try {
      var result = await this.requestService.post(url, body, message);
      this.storage.set('userToken', result.token);
      this.setObservable(result.user);
    } catch (error) {
      throw(error);
    }     

    return result;
  }  

  private setObservable(object){
    this.user = object;
    this.userSubject$.next(this.user);
  }
 
}
