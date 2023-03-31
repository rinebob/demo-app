import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { ThemePalette } from '@angular/material/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { APP_SIDENAV_BUTTONS } from './common/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostBinding('class') theme = 'global-light-theme';
  title = 'demo-app';
  
  shouldShowOpenSidenavButton = true;
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

  getFocusStatus(appName: string) {
    // return this.selectedBoardBS.value.displayName === appName;
  }

  toggleTheme() {
    // console.log('bV tT toggle dark mode pre: ', this.darkModeOn);
    this.theme = this.theme === 'kanban-light-theme' ? 'kanban-dark-theme' : 'kanban-light-theme';
    this.darkModeOnBS.next(!this.darkModeOnBS.value);
    // console.log('bV tT toggle dark mode post: ', this.darkModeOn);
  }

  toggleShowSidenavButton(event: any) {
    console.log('a tSSB event: ', event);
    this.shouldShowOpenSidenavButton = !this.shouldShowOpenSidenavButton;
  }

  
}
