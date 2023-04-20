import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FOOTER_COPYRIGHT, NAV_BUTTONS } from '../../common/au-constants';
import { FOOTER_TEXT } from '../../common/au-constants';

@Component({
  selector: 'app-nav-footer',
  templateUrl: './nav-footer.component.html',
  styleUrls: ['./nav-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavFooterComponent {
  readonly NAV_BUTTONS = NAV_BUTTONS;
  readonly FOOTER_TEXT = FOOTER_TEXT;
  readonly FOOTER_COPYRIGHT = FOOTER_COPYRIGHT;
}
