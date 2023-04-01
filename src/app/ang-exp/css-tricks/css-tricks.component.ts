import { ChangeDetectionStrategy, Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-css-tricks',
  templateUrl: './css-tricks.component.html',
  styleUrls: ['./css-tricks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CssTricksComponent implements AfterViewInit {
  @ViewChild('cursorRef', {read: ElementRef}) cursorRef: ElementRef;
  cursor: HTMLElement;

  numItems = 25;
  items = new Array(this.numItems);

  constructor() {

  }

  ngAfterViewInit() {
    this.cursor = this.cursorRef.nativeElement;
    this.animateCursor();
  }

  animateCursor() {
    console.log('cT aC cursor style: ', this.cursor.style);

    window.onmousemove = (e: any) => {
      // console.log('cT aC on mouse move. event: ', e);
      this.cursor.style.left = e.clientX + 'px';
      this.cursor.style.top = e.clientY + 'px';
    }
  }

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
