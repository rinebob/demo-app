import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { ScrollService } from '../../services/scroll-service.service';
import { APP_SIDENAV_BUTTONS, RINEBOB_EXPERIENCE, RINEBOB_PROJECTS, RINEBOB_SKILLS, WELCOME_BUTTONS } from 'src/app/common/constants';
import { Contact, ViewMode } from 'src/app/common/interfaces';
import { ThemePalette } from '@angular/material/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent implements OnInit {
  @HostBinding('class') theme = 'landing-page-light-theme';

  contactForm = new FormGroup({
    nameControl: new FormControl(''),
    emailControl: new FormControl(''),
    messageControl: new FormControl('')
  });

  readonly RINEBOB_SKILLS = RINEBOB_SKILLS;
  readonly RINEBOB_EXPERIENCE = RINEBOB_EXPERIENCE;
  readonly RINEBOB_PROJECTS = RINEBOB_PROJECTS;
  readonly APP_SIDENAV_BUTTONS = APP_SIDENAV_BUTTONS;
  readonly WELCOME_BUTTONS = WELCOME_BUTTONS;

  globalTopnavMenuCssClass = 'global-topnav-menu-css';
  fragment = '';

  viewModeToggleButtonColor: ThemePalette = 'primary';
  viewModeBS = new BehaviorSubject<ViewMode>('light');
  viewModeOn$: Observable<ViewMode> = this.viewModeBS;

  constructor(private route:ActivatedRoute,
    private scrollService: ScrollService,
    private router:Router) {}

  ngOnInit () {
    this.contactForm.valueChanges.pipe().subscribe(changes => {
      // console.log('lP ngOI contact form value changes sub: ', changes);
    });
  }

  handleTopnavMenuOpen() {
    // console.log('lP hTMO handle global topnav menu open called');
  }

  handleContactSubmission(contact: Contact) {
    // console.log('lP hSM contact: ', contact);
  }

  handleClearForm() {

  }

  handleUpdateViewMode(mode: ViewMode) {
    // console.log('lP hUVM mode switch: ', mode);
    
    if (mode === 'light') {
      this.theme = 'landing-page-light-theme';
      
    } else {
      this.theme = 'landing-page-dark-theme';

    }

    this.viewModeBS.next(mode);
    // console.log('bV tT toggle dark mode post: ', this.darkModeOn);
  }

  scrollToTarget(target: string) {
    // console.log('lP sTT scroll target: ', target);
    this.scrollService.scrollToElementById(target);
  }



}
