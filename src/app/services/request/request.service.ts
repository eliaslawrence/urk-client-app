import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private loading;
  isLoading = false;

  constructor(public http: HttpClient, 
              private loadingCtrl: LoadingController) {
  }

  //POST
  public async post(url, body, message) {   
    try {
      return await this.postRequest(url, body, message);
    } catch (error) {
      throw (error);      
    }         
  }

  private async postRequest(url, body, loadingMessage = null, contentType = 'application/json'): Promise<any>{
    try{
      await this.showLoading(loadingMessage);
      var result = await this.postHttp(url, body, contentType);
    } catch (err) {
      await this.dismissLoading();
      throw err;
    }
    await this.dismissLoading();
    return result;      
  }
 
  private postHttp(uri, body, contentType): Promise<any> {    
    const URL = environment.urlServer + uri;
    if(contentType){
      return this.http.post(URL, body, {headers: new HttpHeaders({'Content-Type':  contentType})}).toPromise();
    } else {
      return this.http.post(URL, body).toPromise();
    }    
  }

  //GET
  public async get(url, params, message) {   
    try {
      return await this.getRequest(url, params, message);
    } catch (error) {
      throw (error);      
    }         
  }

  private async getRequest(url, params, loadingMessage = null): Promise<any>{    
    try{
      await this.showLoading(loadingMessage);
      var result = await this.getHttp(url, params);
    } catch (err) {
      await this.dismissLoading();
      throw err;
    }
    await this.dismissLoading();
    return result;  
  }

  private getHttp(uri, params): Promise<any> {    
    const URL = environment.urlServer + uri;
    return this.http.get(URL, { params: params }).toPromise();
  }

  //PUT
  public put(url, body, message) : Promise<any>{        
    return new Promise((resolve, reject) => {
        this.putRequest(url, body, message).then((result) => {
        resolve(result);
      }, (err) => {
        reject(err);
      });
    });
  }

  private async putRequest(url, body, loadingMessage = null): Promise<any>{
    try{
      await this.showLoading(loadingMessage);
      var result = await this.putHttp(url, body);
    } catch (err) {
      await this.dismissLoading();
      throw err;
    }
    await this.dismissLoading();
    return result;  
  }
 
  private putHttp(uri, body): Promise<any> {    
    const URL = environment.urlServer + uri;
    return this.http.put(URL, body).toPromise();
  }

  private async showLoading(message){
    if(message){
      this.loading = await this.loadingCtrl.create({message: message});
      await this.loading.present();
    }    
  }

  private async dismissLoading(){
    if(this.loading){
      await this.loading.dismiss();
    }    
  }
}
