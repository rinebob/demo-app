import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { Product, ViewportMode } from '../../common/au-interfaces';
import { VIEWPORT_MIN_SIZE } from '../../common/au-constants';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryPageComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.innerWidth = window.innerWidth;
    console.log('pP oR inner width: ', this.innerWidth);
    this.updateViewportMode();
  }

  innerWidth = 0;
  viewportMode: ViewportMode = ViewportMode.DESKTOP;

  category = '';
  categoryBS = new BehaviorSubject<string>('');
  category$: Observable<string> = this.categoryBS;
  productsBS = new BehaviorSubject<Product[]>([]);
  products$: Observable<Product[]> = this.productsBS;

  url = '../'

  constructor(private router: Router, private route: ActivatedRoute) {
    
    // console.log('cP ctor route: ', route);
    
    route.paramMap.pipe().subscribe((params: ParamMap) => {
      // console.log('cP ctor route params: ', params);
      this.categoryBS.next(params.get('id') ?? '');
      // console.log('cP ctor category: ', this.category);
      
    });

    router.events.pipe().subscribe(event => {
      // console.log('cP ctor router events sub: ', event);
    });

  }

  ngOnInit(): void {
    this.route.data.subscribe(({ products }) => {
      // console.log('cP ctor route data products: ', products);

      const orderedProducts = this.setNewProductsFirst(products);

      this.productsBS.next(orderedProducts);
      // console.log('cP ctor products BS value: ', this.productsBS.value);
    })

    const width = window.innerWidth;
    console.log('pP ngOI inner width: ', width);
    this.innerWidth = width;
    this.updateViewportMode();

  }

  setNewProductsFirst(products: Product[]): Product[] {
    let orderedProducts: Product[] = [];

    for (const product of products) {
      if (product.new) {
        orderedProducts.unshift(product);

      } else {
        orderedProducts.push(product);
      }
    }
    
    return orderedProducts;
  }

  updateViewportMode() {
    const width = this.innerWidth;
    // console.log('cP uVM inner width: ', width);
    
    const desktopMin = VIEWPORT_MIN_SIZE.get(ViewportMode.DESKTOP)!;
    const tabletMin = VIEWPORT_MIN_SIZE.get(ViewportMode.TABLET)!;
    
    if (width > desktopMin) {
      this.viewportMode = ViewportMode.DESKTOP;
    } else if (width < desktopMin && width >= tabletMin ) {
      this.viewportMode = ViewportMode.TABLET;
    } else {
      this.viewportMode = ViewportMode.MOBILE;
    }
    
    // console.log('pP uVM final viewport mode: ', this.viewportMode);

  }

}
