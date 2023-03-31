import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-css-tricks',
  templateUrl: './css-tricks.component.html',
  styleUrls: ['./css-tricks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CssTricksComponent {

  numItems = 25;
  items = new Array(this.numItems);

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
