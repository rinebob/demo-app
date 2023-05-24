import { Component } from '@angular/core';

import { ACME_SIDENAV_BUTTONS } from './common/constants-acme';

@Component({
  selector: 'app-acme',
  templateUrl: './acme.component.html',
  styleUrls: ['./acme.component.scss']
})
export class AcmeComponent {

  readonly ACME_SIDENAV_BUTTONS = ACME_SIDENAV_BUTTONS;

}
