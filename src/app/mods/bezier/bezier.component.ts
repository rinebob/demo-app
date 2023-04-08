import { ChangeDetectionStrategy, Component } from '@angular/core';
import { COMING_SOON_METADATA } from '../../common/constants';
import { RinebobSite } from '../../common/interfaces';

@Component({
  selector: 'app-bezier',
  templateUrl: './bezier.component.html',
  styleUrls: ['./bezier.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BezierComponent {
  app = COMING_SOON_METADATA[RinebobSite.CUBIC_BEZIER_APP];

}
