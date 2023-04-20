import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, ActivatedRouteSnapshot } from '@angular/router';
import { Product } from '../../common/au-interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryPageComponent implements OnInit {

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
      this.productsBS.next(products);
      // console.log('cP ctor products BS value: ', this.productsBS.value);
    })
  }

}
