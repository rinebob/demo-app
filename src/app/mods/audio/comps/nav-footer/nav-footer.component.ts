import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FOOTER_COPYRIGHT, FOOTER_TEXT, NAV_BUTTONS } from '../../common/au-constants';
import { AppText } from '../../common/au-interfaces';

@Component({
  selector: 'app-nav-footer',
  templateUrl: './nav-footer.component.html',
  styleUrls: ['./nav-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavFooterComponent {
  readonly AppText = AppText;
  readonly NAV_BUTTONS = NAV_BUTTONS;
  readonly FOOTER_TEXT = FOOTER_TEXT;
  readonly FOOTER_COPYRIGHT = FOOTER_COPYRIGHT;
}
