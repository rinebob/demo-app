import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  
} from '@angular/animations';

import { DisplayMode} from './interfaces-animations';
@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [],
})
export class AnimationsComponent {

  readonly DisplayMode = DisplayMode;

  handleTabAnimationDone(event: any) {
    // console.log('a hTAD tab animation done event: ', event);
  }

  handleTabFocusChange(event: any) {
    // console.log('a hTFC tab focus change event: ', event);
  }

  handleSelectedIndexChange(event: any) {
    // console.log('a hSIC tab selected index change event: ', event);
  }
  
  handleSelectedTabChange(event: any) {
    // console.log('a hSTC tab selected tab change event: ', event);
  }



}
