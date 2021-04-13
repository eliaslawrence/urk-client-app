import { Injectable } from '@angular/core';
import { RequestService } from '../../request/request.service';

const BASE_URI = 'productImage/';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  constructor(private requestService: RequestService) { }

  // REMOVE IMAGE
  async remove(productImage) : Promise<any>{
    let uri = BASE_URI + 'remove';
    return await this.requestService.post(uri, productImage, "Removendo...");
  }
}
