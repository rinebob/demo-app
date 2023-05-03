import { Component } from '@angular/core';

import { TRADER_NAV_BUTTONS } from './common/tr-constants';

@Component({
  selector: 'app-trader-view',
  templateUrl: './trader-view.component.html',
  styleUrls: ['./trader-view.component.scss']
})
export class TraderViewComponent {

  readonly TRADER_NAV_BUTTONS = TRADER_NAV_BUTTONS;

}
