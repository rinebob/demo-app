import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { Product, ViewportMode } from '../../common/au-interfaces';
import { ViewportService } from '../../services/viewport.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryPageComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // console.log('cP oR inner width: ', this.innerWidth);
    this.viewportService.updateViewportMode(window.innerWidth);
  }

  viewportMode: ViewportMode = ViewportMode.DESKTOP;

  viewportMode$ = this.viewportService.viewportMode$;

  category = '';
  categoryBS = new BehaviorSubject<string>('');
  category$: Observable<string> = this.categoryBS;
  productsBS = new BehaviorSubject<Product[]>([]);
  products$: Observable<Product[]> = this.productsBS;

  url = '../'

  constructor(private router: Router, private route: ActivatedRoute,
              readonly viewportService: ViewportService) {
    
    // console.log('cP ctor route: ', route);
    
    route.paramMap.pipe().subscribe((params: ParamMap) => {
      // console.log('cP ctor route params: ', params);
      this.categoryBS.next(params.get('id') ?? '');
      // console.log('cP ctor category: ', this.category);
      
    });

    router.events.pipe().subscribe(event => {
      // console.log('cP ctor router events sub: ', event);
    });

    this.viewportMode$.pipe().subscribe(mode => {
      // console.log('pP ctor viewport mode sub: ', mode);
      this.viewportMode = mode;
      
    });

  }

  ngOnInit(): void {
    this.route.data.subscribe(({ products }) => {
      // console.log('cP ctor route data products: ', products);

      const orderedProducts = this.setNewProductsFirst(products);

      this.productsBS.next(orderedProducts);
      // console.log('cP ctor products BS value: ', this.productsBS.value);
    })

    this.viewportService.updateViewportMode(window.innerWidth);

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
}
