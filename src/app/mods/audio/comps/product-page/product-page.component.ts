import { ChangeDetectionStrategy, Component, HostListener, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Scroll } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { AddToCartProduct, AuScrollTargetId, Product, ViewportMode } from '../../common/au-interfaces';
import { PRODUCT_INITIALIZER, VIEWPORT_MIN_SIZE } from '../../common/au-constants';
import { UrlService } from '../../services/url.service';
import { ViewportService } from '../../services/viewport.service';
import { ScrollService } from 'src/app/services/scroll-service.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPageComponent implements OnDestroy {
  readonly destroy$ = new Subject<void>();
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.viewportService.updateViewportMode(window.innerWidth);
  }

  viewportMode: ViewportMode = ViewportMode.DESKTOP;
  viewportMode$ = this.viewportService.viewportMode$;

  productBS = new BehaviorSubject<Product>(PRODUCT_INITIALIZER);
  product$: Observable<Product> = this.productBS;

  previousUrl$ = this.urlService.previousUrl$;

  url = '../../category'

  constructor(private router: Router, private route: ActivatedRoute,
    private scrollService: ScrollService,
      readonly urlService: UrlService, readonly viewportService: ViewportService
    ) {

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
    this.route.data.subscribe(({ product }) => {
      // console.log('pP ctor route data product: ', product);
      this.productBS.next(product);
      // console.log('pP ctor product BS value: ', this.productBS.value);
    })

    this.viewportService.updateViewportMode(window.innerWidth);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  scrollToTop() {
    // console.log('cP sTT scroll to top');
    this.scrollService.scrollToElementById(AuScrollTargetId.AUDIO_NAV);
  }
}
