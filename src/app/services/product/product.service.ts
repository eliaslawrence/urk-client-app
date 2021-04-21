import { Injectable } from '@angular/core';
import { RequestService } from '../request/request.service';

const BASE_URI = 'product/';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private requestService: RequestService) { }

  // FIND
  async findById(productId) {
    let uri = BASE_URI +'findById/' + productId;
    return await this.requestService.get(uri, {}, "Buscando...");
  }

  async findByStore(storeId) {
    let uri = BASE_URI +'findByStore/' + storeId;
    return await this.requestService.get(uri, {}, "Buscando...");
  }
  async search(limit,skip,text=undefined) {
    let uri = BASE_URI +'search/' + limit + '/' + skip  + '/' + (text == undefined ? '' : text);
    return await this.requestService.get(uri, {}, null);
  }
}
