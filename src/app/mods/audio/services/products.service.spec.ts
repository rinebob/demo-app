import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { take } from 'rxjs';
import { Product } from '../common/au-interfaces';
import { PRODUCT_INITIALIZER } from '../common/au-constants';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returns all products', () => {
    let numProducts = 0;
    let product: Product = PRODUCT_INITIALIZER;

    service.allProducts().pipe(take(1)).subscribe(prods => {
      numProducts = prods.length;
      product = {...prods[0]} as Product;
    });

    expect(numProducts).toEqual(6);
    expect(product['name']).toEqual('YX1 Wireless Earphones')
  });

  it('returns products for a category', () => {
    let numProducts = 0;
    let product: Product = PRODUCT_INITIALIZER;

    service.productsForCategory('speakers').pipe(take(1)).subscribe(prods => {
      numProducts = prods.length;
      product = {...prods[0]} as Product;
    });

    expect(numProducts).toEqual(2);
    expect(product['name']).toEqual('ZX7 Speaker');
  });

  it('returns a product by id', () => {
    const product = service.productById('xx99-mark-two-headphones') ?? PRODUCT_INITIALIZER;
    const noProduct = service.productById('doesnt exist') ?? PRODUCT_INITIALIZER;

    expect(product.name).toEqual('XX99 Mark II Headphones')
    expect(noProduct).toEqual(PRODUCT_INITIALIZER);
  });
});
