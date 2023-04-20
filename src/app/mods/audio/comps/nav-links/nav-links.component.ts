import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NAV_BUTTONS } from '../../common/au-constants';

@Component({
  selector: 'app-nav-links',
  templateUrl: './nav-links.component.html',
  styleUrls: ['./nav-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavLinksComponent {

  readonly NAV_BUTTONS = NAV_BUTTONS;
}
