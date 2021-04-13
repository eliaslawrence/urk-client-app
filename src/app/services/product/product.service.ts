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

  async findByUser() {
    let uri = BASE_URI +'findByUser/';
    return await this.requestService.get(uri, {}, "Buscando...");
  }

  // UPDATE
  async updateAttribute(productId, attributeJSON) : Promise<any>{
    let uri = BASE_URI + 'updateAttribute/' + productId;
    return this.requestService.put(uri, attributeJSON, "Atualizando...");
  }  

  async updateCoverImage(productId, file) : Promise<any>{
    let uri = BASE_URI + 'updateCoverImage/' + productId;
    let product = await this.requestService.post(uri, file, "Atualizando...");
    return product;
  }

  async addImage(productId, file) : Promise<any>{
    let uri = BASE_URI + 'addImage/' + productId;
    let product = await this.requestService.post(uri, file, "Atualizando...");
    return product;
  }

  // DELETE
  async delete(productId) : Promise<any>{
    let uri = BASE_URI + 'delete/' + productId;
    return await this.requestService.post(uri, {}, "Removendo...");
  }

  // CREATE
  async createEmpty() : Promise<any>{
    let uri = BASE_URI + 'createEmpty/';
    return await this.requestService.post(uri, {}, "Criando...");
  }
}
