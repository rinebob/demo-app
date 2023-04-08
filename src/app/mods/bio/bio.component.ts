import { ChangeDetectionStrategy, Component } from '@angular/core';
import { COMING_SOON_METADATA } from '../../common/constants';
import { RinebobSite } from '../../common/interfaces';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BioComponent {

  app = COMING_SOON_METADATA[RinebobSite.BIO_DATA_APP];

}
