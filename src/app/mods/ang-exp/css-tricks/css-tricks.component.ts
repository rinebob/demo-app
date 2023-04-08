import { ChangeDetectionStrategy, Component, AfterViewInit, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { ICON_NAV_BAR_LINKS } from 'src/app/common/constants';

@Component({
  selector: 'app-css-tricks',
  templateUrl: './css-tricks.component.html',
  styleUrls: ['./css-tricks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CssTricksComponent implements AfterViewInit {
  // for Hexagons cursor effect
  @ViewChild('cursorRef', {read: ElementRef}) cursorRef: ElementRef;
  cursor: HTMLElement;

  // @ViewChildren('navItem', {read: ElementRef}) links: ElementRef[];

  numItems = 25;
  items = new Array(this.numItems);

  readonly ICON_NAV_BAR_LINKS = ICON_NAV_BAR_LINKS;

  constructor() {

  }

  ngAfterViewInit() {
    this.cursor = this.cursorRef.nativeElement;
    this.animateCursor();

    // console.log('cT ngAVI links: ', this.links);

    // for (const link of this.links) {
    //   console.log('cT ngAVI link: ', link);
    //   link.nativeElement.classList.remove('active');
    // }

    // this.animateLink('navItem1');

  }

  animateCursor() {
    // console.log('cT aC cursor style: ', this.cursor.style);

    window.onmousemove = (e: any) => {
      // console.log('cT aC on mouse move. event: ', e);
      this.cursor.style.left = e.clientX + 'px';
      this.cursor.style.top = e.clientY + 'px';
    }
  }

  // animateLink(id: string) {
  //   console.log('cT aL id: ', id);
    
  //   // console.log('cT aL removing active classes');
  //   for (const link of this.links) {
  //     // console.log('cT aL link class list pre: ', link?.nativeElement.id, link?.nativeElement.classList);
  //     link.nativeElement.classList.remove('active');
  //     // console.log('cT aL link class list post: ', link?.nativeElement.id, link?.nativeElement.classList);
  //   }
    
  //   // console.log('cT aL adding active class');
  //   const link = this.links.find(item => item.nativeElement.id === id);
  //   // console.log('cT aL clicked link : ', link?.nativeElement);
    
  //   // console.log('cT aL link class list pre: ', link?.nativeElement.classList);
  //   link?.nativeElement.classList.add('active');
  //   // console.log('cT aL link class list post: ', link?.nativeElement.classList);
    

  // }

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
