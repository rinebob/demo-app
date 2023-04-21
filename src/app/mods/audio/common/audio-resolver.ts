import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Product } from '../common/au-interfaces';
import { ProductsService } from '../services/products.service';
import { PRODUCT_INITIALIZER } from './au-constants';

// for implementation using inject function
// https://angular.io/guide/router-tutorial-toh#fetch-data-before-navigating

@Injectable({providedIn: 'root'})
export class CategoryResolver implements Resolve<Product[]> {

    url = '';
    
    constructor(readonly productsService: ProductsService) {}

    resolve(state: ActivatedRouteSnapshot) {
        // console.log('aR r router state: ', state);
        const target = state.params['id'];
        // console.log('aR r route target: ', target);
        
        const products$ = this.productsService.allProducts();
        let filteredProducts: Product[] = [];
        products$.pipe().subscribe(products => {
            filteredProducts = products.filter(product => product.category === target);
            // console.log('aR r filtered products: ', filteredProducts);
        });

        return filteredProducts;
    }
}

@Injectable({providedIn: 'root'})
export class ProductResolver implements Resolve<Product|undefined> {
    url = '';

    constructor(readonly productsService: ProductsService) {}

    resolve(state: ActivatedRouteSnapshot) {
        // console.log('aR r router state: ', state);
        const target = state.params['id'];
        // console.log('aR r route target: ', target);
        
        const products$ = this.productsService.allProducts();
        let product: Product|undefined = undefined;
        products$.pipe().subscribe(products => {
            product = products.find(product => product.slug === target);
            // console.log('aR pR r product: ', product);
        });

        return product;
    }
}