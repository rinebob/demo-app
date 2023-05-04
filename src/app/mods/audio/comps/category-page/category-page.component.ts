import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, NavigationEnd, Scroll } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { AuScrollTargetId, Product, ViewportMode } from '../../common/au-interfaces';
import { ViewportService } from '../../services/viewport.service';
import { ScrollService } from 'src/app/services/scroll-service.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryPageComponent implements OnDestroy, OnInit {
  readonly destroy$ = new Subject<void>();
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

  readonly URL = '../'
  readonly AuScrollTargetId = AuScrollTargetId;

  constructor(private router: Router, readonly route: ActivatedRoute,
              private scrollService: ScrollService,
              readonly viewportService: ViewportService) {
                
    // console.log('cP ctor route paramMap: ', route.paramMap);

    route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params: ParamMap) => {
      // console.log('cP ctor route params: ', params);
      this.categoryBS.next(params.get('id') ?? '');
      // console.log('cP ctor category: ', this.category);
      
    });

    router.events.pipe(takeUntil(this.destroy$)).subscribe(event => {
      // console.log('cP ctor router events sub: ', event);
      if (event instanceof Scroll) {
        // console.log('cP ctor router events sub: ', event);
        this.scrollToTop();
      }
    });

    this.viewportMode$.pipe(takeUntil(this.destroy$)).subscribe(mode => {
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  scrollToTop() {
    // console.log('cP sTT scroll to top');
    this.scrollService.scrollToElementById(AuScrollTargetId.AUDIO_NAV);
  }
}
