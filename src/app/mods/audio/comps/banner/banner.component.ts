import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppText } from '../../common/au-interfaces';
import { BANNER_TEXT } from '../../common/au-constants';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent {

  readonly AppText = AppText;
  readonly BANNER_TEXT = BANNER_TEXT

}
