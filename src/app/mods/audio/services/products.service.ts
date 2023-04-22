import { Injectable } from '@angular/core';

import { AUDIO_PRODUCTS } from '../common/audio-mock-data';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { 
    // console.log('pS ngOI audio products: ', AUDIO_PRODUCTS);
  }
  
  allProducts() {
    // console.log('pS all products: ', AUDIO_PRODUCTS);
    return of(AUDIO_PRODUCTS);
  }
  
  productsForCategory(category: string) {
    const products = AUDIO_PRODUCTS.filter(product => product.category === category);
    // console.log('pS products by category: ', products);
    return of(products);
  }
  
  productById(slug: string) {
    const product = AUDIO_PRODUCTS.find(product => product.slug === slug);
    // console.log('pS product by id: ', product);
    return product;
  }
}
