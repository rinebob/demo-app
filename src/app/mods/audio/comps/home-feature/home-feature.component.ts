import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HOME_FEATURE_TEXT } from '../../common/au-constants';
import { AppText } from '../../common/au-interfaces';


@Component({
  selector: 'app-home-feature',
  templateUrl: './home-feature.component.html',
  styleUrls: ['./home-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeFeatureComponent {

  readonly AppText = AppText;
  readonly HOME_FEATURE_TEXT = HOME_FEATURE_TEXT;

}
