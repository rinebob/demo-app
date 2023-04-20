import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { CATEGORIES, NAV_BUTTONS } from '../../common/au-constants';
import { AppText } from '../../common/au-interfaces';

@Component({
  selector: 'app-shop-panel',
  templateUrl: './shop-panel.component.html',
  styleUrls: ['./shop-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopPanelComponent {
  @Input() url:string;

  constructor(readonly router: Router) {

  }
  readonly CATEGORIES = CATEGORIES;
  readonly NAV_BUTTONS = NAV_BUTTONS;
  readonly AppText = AppText;

}
