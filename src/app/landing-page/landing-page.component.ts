import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { ScrollService } from '../services/scroll-service.service';
import { APP_SIDENAV_BUTTONS, RINEBOB_EXPERIENCE, RINEBOB_PROJECTS, RINEBOB_SKILLS, WELCOME_BUTTONS } from 'src/app/common/constants';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent implements OnInit {

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

  handleSendMessage() {
    // console.log('lP hSM contact form value: ', this.contactForm.value);
  }

  handleClearForm() {

  }

  scrollToTarget(target: string) {
    // console.log('lP sTT scroll target: ', target);
    this.scrollService.scrollToElementById(target);
  }



}
