import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RequestService } from '../request/request.service';

const BASE_URI = 'store/';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private store: any = {};
  private storeSubject$ = new BehaviorSubject<any>(this.store);
  storeChanged$ = this.storeSubject$.asObservable();

  constructor(private requestService: RequestService) { }

  // FIND
  async findById(storeId) {
    let uri = BASE_URI +'findById/' + storeId;
    return await this.requestService.get(uri, {}, "Buscando...");
  }

  async search(limit,skip,text=undefined) {
    let uri = BASE_URI +'search/' + limit + '/' + skip  + '/' + (text == undefined ? '' : text);
    return await this.requestService.get(uri, {}, null);
  }
}
