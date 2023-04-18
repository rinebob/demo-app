import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CATEGORIES } from '../../common/au-constants';

@Component({
  selector: 'app-shop-panel',
  templateUrl: './shop-panel.component.html',
  styleUrls: ['./shop-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopPanelComponent {

  readonly CATEGORIES = CATEGORIES;

}
