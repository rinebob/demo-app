import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { RinebobUrl } from '../../common/interfaces';


@Component({
  selector: 'app-social-icon-links',
  templateUrl: './social-icon-links.component.html',
  styleUrls: ['./social-icon-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialIconLinksComponent {

  readonly RinebobUrl = RinebobUrl;

  constructor(private router: Router) {

  }

  navigate(url: string) {
    // console.log('sIL n navigating to url: ', url);
    this.router.navigate([url], { onSameUrlNavigation: 'reload' });

  }

}
