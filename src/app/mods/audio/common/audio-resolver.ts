import { Injectable, OnDestroy, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject, of, takeUntil } from 'rxjs';

import { Product } from '../common/au-interfaces';
import { ProductsService } from '../services/products.service';
import { PRODUCT_INITIALIZER } from './au-constants';

// for implementation using inject function
// https://angular.io/guide/router-tutorial-toh#fetch-data-before-navigating

@Injectable({providedIn: 'root'})
export class CategoryResolver implements OnDestroy, Resolve<Product[]> {
    readonly destroy$ = new Subject<void>();

    url = '';
    
    constructor(readonly productsService: ProductsService) {}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    resolve(state: ActivatedRouteSnapshot) {
        // console.log('aR r router state: ', state);
        const target = state.params['id'];
        // console.log('aR r route target: ', target);
        
        const products$ = this.productsService.allProducts();
        let filteredProducts: Product[] = [];
        products$.pipe(takeUntil(this.destroy$)).subscribe(products => {
            filteredProducts = products.filter(product => product.category === target);
            // console.log('aR r filtered products: ', filteredProducts);
        });

        return filteredProducts;
    }
}

@Injectable({providedIn: 'root'})
export class ProductResolver implements OnDestroy, Resolve<Product|undefined> {
    readonly destroy$ = new Subject<void>();
    url = '';

    constructor(readonly productsService: ProductsService) {}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    resolve(state: ActivatedRouteSnapshot) {
        // console.log('aR r router state: ', state);
        const target = state.params['id'];
        // console.log('aR r route target: ', target);
        
        const products$ = this.productsService.allProducts();
        let product: Product|undefined = undefined;
        products$.pipe(takeUntil(this.destroy$)).subscribe(products => {
            product = products.find(product => product.slug === target);
            // console.log('aR pR r product: ', product);
        });

        return product;
    }
}