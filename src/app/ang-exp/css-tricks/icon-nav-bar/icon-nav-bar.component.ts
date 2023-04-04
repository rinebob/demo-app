import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChildren } from '@angular/core';
import { IconNavBarLink } from 'src/app/common/interfaces';

@Component({
  selector: 'app-icon-nav-bar',
  templateUrl: './icon-nav-bar.component.html',
  styleUrls: ['./icon-nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconNavBarComponent implements AfterViewInit {
  @Input() navBarLinks: IconNavBarLink[] = [];

  @ViewChildren('navItem', {read: ElementRef}) links: ElementRef[];

  ngAfterViewInit() {
    // console.log('iNB ngAVI navBarLinks input: ', this.navBarLinks);

    for (const link of this.links) {
      // console.log('iNB ngAVI link: ', link);
      link.nativeElement.classList.remove('active');
    }

    // this.animateLink('navItem1');
    this.animateLink(this.navBarLinks[0].name);

  }

  // animateLink(id: string) {
  animateLink(name: string) {
    // console.log('iNB aL link name: ', name);
    
    // console.log('iNB aL removing active classes');
    for (const link of this.links) {
      // console.log('iNB aL link class list pre: ', link?.nativeElement.id, link?.nativeElement.classList);
      link.nativeElement.classList.remove('active');
      // console.log('iNB aL link class list post: ', link?.nativeElement.id, link?.nativeElement.classList);
    }
    
    // console.log('iNB aL adding active class');
    const link = this.links.find(item => item.nativeElement.id === name);
    // console.log('iNB aL clicked link : ', link?.nativeElement);
    
    // console.log('iNB aL link class list pre: ', link?.nativeElement.classList);
    link?.nativeElement.classList.add('active');
    // console.log('iNB aL link class list post: ', link?.nativeElement.classList);
    

  }

}
