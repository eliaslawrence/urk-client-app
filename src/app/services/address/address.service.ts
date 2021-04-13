import { Injectable } from '@angular/core';
import { RequestService } from '../request/request.service';

const BASE_URI = 'address/';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private requestService: RequestService) { }

  // CREATE
  create(storeID, newAddress) : Promise<any>{
    let uri = BASE_URI + 'create/' + storeID;
    return this.requestService.post(uri, {newAddress: newAddress}, "Criando...");
  }

  // Update
  updateAttribute(storeID, attributeJSON) : Promise<any>{
    let uri = BASE_URI + 'updateAttribute/' + storeID;
    return this.requestService.put(uri, attributeJSON, "Atualizando...");
  }
}
