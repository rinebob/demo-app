import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { ThemePalette } from '@angular/material/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { APP_SIDENAV_BUTTONS } from './common/constants';
import { AppRoutes, AppTheme } from './common/interfaces';
import { UserService } from './services/user.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  readonly destroy$ = new Subject<void>()
  @HostBinding('class') theme = AppTheme.APP_LIGHT;
  title = 'demo-app';
  
  shouldShowOpenSidenavButton = false;
  shouldShowReturnHomeButton = false;
  darkModeToggleButtonColor: ThemePalette = 'primary';
  darkModeOnBS = new BehaviorSubject(false);
  darkModeOn$: Observable<boolean> = this.darkModeOnBS;

  readonly APP_SIDENAV_BUTTONS = APP_SIDENAV_BUTTONS;

  constructor(private router: Router, private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    ) {

    // this.matIconRegistry.addSvgIcon(
    //   `logo-light`,
    //   this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/logo-light.svg")
    // );

    // this.matIconRegistry.addSvgIcon(
    //   `icon-light-theme`,
    //   this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/icon-light-theme.svg")
    // );
  }

  ngOnInit() {
    
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(event => {
      // console.log('a ctor url: ', (event as NavigationEnd).url);
      if (event instanceof NavigationEnd) {
        // console.log('a ctor router event: ', event.url);
        const segments = event.url.split('/');
        // console.log('a ctor route segments/segments[1]: ', segments, segments[1]);
        // console.log('a ctor segments contains robert: ', segments.includes(AppRoutes.ROBERT));
        if (!segments.includes(AppRoutes.ROBERT) && !segments.includes(AppRoutes.DESIGN_SYSTEM)) {
          this.shouldShowReturnHomeButton = true;
        } else {
          this.shouldShowReturnHomeButton = false;
        }
      }

    });
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getFocusStatus(appName: string) {
    // return this.selectedBoardBS.value.displayName === appName;
  }

  toggleTheme() {
    // console.log('bV tT toggle dark mode pre: ', this.darkModeOn);
    this.theme = this.theme === AppTheme.APP_LIGHT ? AppTheme.APP_DARK : AppTheme.APP_LIGHT;
    // this.theme = this.theme === 'kanban-light-theme' ? 'kanban-dark-theme' : 'kanban-light-theme';
    this.darkModeOnBS.next(!this.darkModeOnBS.value);
    // console.log('bV tT toggle dark mode post: ', this.darkModeOn);
  }

  toggleShowSidenavButton(event: any) {
    // console.log('a tSSB event: ', event);
    // this.shouldShowOpenSidenavButton = !this.shouldShowOpenSidenavButton;
  }

  
}
