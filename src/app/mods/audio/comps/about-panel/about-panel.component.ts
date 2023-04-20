import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ABOUT_SECTION_TEXT } from '../../common/au-constants';

@Component({
  selector: 'app-about-panel',
  templateUrl: './about-panel.component.html',
  styleUrls: ['./about-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutPanelComponent {

  readonly ABOUT_SECTION_TEXT = ABOUT_SECTION_TEXT;
}
