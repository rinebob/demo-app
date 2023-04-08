import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute, ChildrenOutletContexts, Event, NavigationEnd, PRIMARY_OUTLET, Router, RouterEvent } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { BehaviorSubject, Observable, filter } from 'rxjs';

import { ANG_EXP_NAV_BUTTONS } from '../../common/constants';
import { AppTheme } from '../../common/interfaces';
import { slideInAnimation } from './animations/animations';

@Component({
  selector: 'app-ang-exp',
  templateUrl: './ang-exp.component.html',
  styleUrls: ['./ang-exp.component.scss'],
  animations: [slideInAnimation],
})
export class AngExpComponent {
  @HostBinding('class') theme = AppTheme.ANG_EXP_LIGHT;

  shouldShowOpenDrawerButton = true;
  darkModeToggleButtonColor: ThemePalette = 'primary';
  darkModeOnBS = new BehaviorSubject(false);
  darkModeOn$: Observable<boolean> = this.darkModeOnBS;
  pageTitle = '';

  readonly ANG_EXP_NAV_BUTTONS = ANG_EXP_NAV_BUTTONS;

  constructor(private router: Router, private contexts: ChildrenOutletContexts) {
    router.events.pipe(filter((event: Event) => event instanceof NavigationEnd)).subscribe(ev => {
      const event = ev as NavigationEnd;
      const segments = event.urlAfterRedirects.split('/');
      const segment = segments[segments.length - 1];
      this.pageTitle = ANG_EXP_NAV_BUTTONS.find(button => button.routerLink === segment)?.text ?? '';
      
      for (const [key, value] of  Object.entries(event)) {
        // console.log('aE ctor key/value: ', key, value);


      }

      this.getRouteAnimationData();
    });

  }

  getRouteAnimationData() {
    // console.log('aE gRAD contexts: ', this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation']);
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  toggleTheme() {
    // console.log('bV tT toggle dark mode pre: ', this.darkModeOnBS.value);
    this.theme = this.theme === AppTheme.ANG_EXP_LIGHT ? AppTheme.ANG_EXP_DARK : AppTheme.ANG_EXP_LIGHT;
    this.darkModeOnBS.next(!this.darkModeOnBS.value);
    // console.log('bV tT toggle dark mode post: ', this.darkModeOnBS.value);
  }

  toggleShowDrawerButton(event: any) {
    // console.log('aE tSSB event: ', event);
    this.shouldShowOpenDrawerButton = !this.shouldShowOpenDrawerButton;

  }

  setTitle(title: string) {
    this.pageTitle = title;

  }

}
