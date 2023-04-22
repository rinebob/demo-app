import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { AppText, RelatedProduct, ViewportMode } from '../../common/au-interfaces';

@Component({
  selector: 'app-also-like-panel',
  templateUrl: './also-like-panel.component.html',
  styleUrls: ['./also-like-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlsoLikePanelComponent {
  @Input()
  set products(products: RelatedProduct[]) {
    if (products) {
      // console.log('aLP @i input products: ', products);
      this.productsBS.next(products);
    }
  }
  get products() {
    return this.productsBS.value;
  }
  productsBS = new BehaviorSubject<RelatedProduct[]>([]);

  @Input()
  set viewportMode(viewportMode: ViewportMode) {
    // console.log('pC @i viewportMode: ', viewportMode);
    this.viewportModeBS.next(viewportMode);
  };
  get viewportMode() {
    return this.viewportModeBS.value;
  }
  viewportModeBS = new BehaviorSubject<ViewportMode>(ViewportMode.DESKTOP);

  readonly AppText = AppText;

  constructor(readonly router: Router, readonly route: ActivatedRoute) {

  }

}
