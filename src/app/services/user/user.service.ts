import { Injectable } from '@angular/core';
import { RequestService } from '../request/request.service';
import { BehaviorSubject } from 'rxjs';

const BASE_URI = 'user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any = {};
  private userSubject$ = new BehaviorSubject<any>(this.user);
  userChanged$ = this.userSubject$.asObservable();

  constructor(private requestService: RequestService) {
  }

  //Get logged user
  async getLoggedUser() : Promise<any>{
    let uri = BASE_URI +'getLogged/';      
    return await this.get(uri, {}, "Entrando...");
  }  

  private async get(url, body, message) {   
    try {
      var result = await this.requestService.get(url, body, message);
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
