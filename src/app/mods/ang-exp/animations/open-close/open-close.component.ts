import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { FormControl, FormGroup } from '@angular/forms';

import * as anim from '../animations';
import * as mosh from '../mosh-animations';

@Component({
  selector: 'app-open-close',
  templateUrl: './open-close.component.html',
  styleUrls: ['./open-close.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [

    anim.slideInAnimation,
    anim.openCloseAnimation,
    anim.myInsertRemoveTrigger,
    mosh.fadeTrigger,
    // mosh.moshFadeInAnimation3,
    mosh.moshSlideTrigger1,
    mosh.moshSlideTrigger2,
    mosh.moshSlideTrigger3,
    mosh.moshFadeTrigger4,
    mosh.moshContainerTrigger2,
  ],
})
export class OpenCloseComponent {
  isOpen = true;
  isShown = false;

  itemForm = new FormGroup({
    'itemInput': new FormControl(''),
  })

  items = [
    'Implement a cool app dude',
    // 'Give it a lot of bells and whistles',
    // 'Make it look cool',
  ];

  toggleIsOpen() {
    this.isOpen = !this.isOpen;
    console.log('oC t toggle button. t.open post: ', this.isOpen); 
  }

  toggleIsShown() {
    this.isShown = !this.isShown;
    console.log('oC t toggle button. t.open post: ', this.isShown); 
  }

  addItem() {
    const value = this.itemForm.controls['itemInput'].value;
    console.log('oC aI item input value: ', value);
    
    this.items.push(value ?? '')
    
  }
  
  removeItem(item: string) {
    console.log('oC rI removed item/items pre: ', item, this.items);
    this.items = this.items.filter(i => i !== item);
    console.log('oC rI items post: ', this.items);

  }

  animationStarted(event: any) {
    console.log('oC aS animation event: ', event);
  }

  animationDone(event: any) {
    console.log('oC aD animation event: ', event);
  }
}
