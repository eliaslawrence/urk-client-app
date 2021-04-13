import { Injectable } from '@angular/core';
import { RequestService } from '../request/request.service';

const BASE_URI = 'telephone/';

@Injectable({
  providedIn: 'root'
})
export class TelephoneService {

  constructor(private requestService: RequestService) { }

  // CREATE
  async create(storeID, newTelephone) : Promise<any>{
    let uri = BASE_URI + 'create/' + storeID;
    return await this.requestService.post(uri, {newTelephone: newTelephone}, "Criando...");
  }

  // DELETE
  async delete(telephoneId) : Promise<any>{
    let uri = BASE_URI + 'delete/' + telephoneId;
    return await this.requestService.post(uri, {}, "Removendo...");
  }

  // Update
  async updateAttribute(storeID, attributeJSON) : Promise<any>{
    let uri = BASE_URI + 'updateAttribute/' + storeID;
    return await this.requestService.put(uri, attributeJSON, "Atualizando...");
  }
}
