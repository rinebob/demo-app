import { Component } from '@angular/core';

@Component({
  selector: 'app-ang-exp',
  templateUrl: './ang-exp.component.html',
  styleUrls: ['./ang-exp.component.scss']
})
export class AngExpComponent {

  shouldShowOpenDrawerButton = true;

  toggleShowDrawerButton(event: any) {
    console.log('aE tSSB event: ', event);
    this.shouldShowOpenDrawerButton = !this.shouldShowOpenDrawerButton;

  }

}
