import { ChangeDetectionStrategy, Component } from '@angular/core';

import { COMING_SOON_METADATA } from '../../common/constants';
import { RinebobSite } from '../../common/interfaces';

@Component({
  selector: 'app-charts-view',
  templateUrl: './charts-view.component.html',
  styleUrls: ['./charts-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsViewComponent {
  app = COMING_SOON_METADATA[RinebobSite.TRADING_VIEW_APP];

}
