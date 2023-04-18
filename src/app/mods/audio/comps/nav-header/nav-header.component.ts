import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NavButtons } from '../../common/au-constants';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavHeaderComponent {

  readonly NavButtons = NavButtons;

}
