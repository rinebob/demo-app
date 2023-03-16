import { Component, HostBinding } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ANG_EXP_NAV_BUTTONS } from '../common/constants';

@Component({
  selector: 'app-ang-exp',
  templateUrl: './ang-exp.component.html',
  styleUrls: ['./ang-exp.component.scss']
})
export class AngExpComponent {
  @HostBinding('class') theme = 'ang-exp-light-theme';

  shouldShowOpenDrawerButton = true;
  darkModeToggleButtonColor: ThemePalette = 'primary';
  darkModeOnBS = new BehaviorSubject(false);
  darkModeOn$: Observable<boolean> = this.darkModeOnBS;

  readonly ANG_EXP_NAV_BUTTONS = ANG_EXP_NAV_BUTTONS;

  toggleTheme() {
    // console.log('bV tT toggle dark mode pre: ', this.darkModeOnBS.value);
    this.theme = this.theme === 'ang-exp-light-theme' ? 'ang-exp-dark-theme' : 'ang-exp-light-theme';
    this.darkModeOnBS.next(!this.darkModeOnBS.value);
    // console.log('bV tT toggle dark mode post: ', this.darkModeOnBS.value);
  }

  toggleShowDrawerButton(event: any) {
    // console.log('aE tSSB event: ', event);
    this.shouldShowOpenDrawerButton = !this.shouldShowOpenDrawerButton;

  }

}
