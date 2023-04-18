import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavButtons } from '../../common/au-constants';

@Component({
  selector: 'app-nav-footer',
  templateUrl: './nav-footer.component.html',
  styleUrls: ['./nav-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavFooterComponent {
  readonly NavButtons = NavButtons;
}
