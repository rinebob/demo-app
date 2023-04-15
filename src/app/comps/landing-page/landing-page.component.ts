import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, Inject, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';

import { ScrollService } from '../../services/scroll-service.service';
import { APP_SIDENAV_BUTTONS, RINEBOB_EXPERIENCE, RINEBOB_PROJECTS, RINEBOB_SKILLS, WELCOME_BUTTONS, WELCOME_TEXT } from 'src/app/common/constants';
import { Contact, ViewMode } from 'src/app/common/interfaces';
import { ThemePalette } from '@angular/material/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent implements AfterViewInit, OnInit {
  @HostBinding('class') theme = 'landing-page-dark-theme';
  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  @ViewChild('mainContainer') mainContainer: ElementRef;

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
  readonly WELCOME_TEXT = WELCOME_TEXT;
  
  globalTopnavMenuCssClass = 'global-topnav-menu-css';
  fragment = '';

  viewModeToggleButtonColor: ThemePalette = 'primary';
  viewModeBS = new BehaviorSubject<ViewMode>('light');
  viewModeOn$: Observable<ViewMode> = this.viewModeBS;


  ////////// HEXAGON ROW SIZING /////////////
  // Hexagon size = 110px x 100px
  // Height of a row of hexagons when properly aligned.  Used to calc the number of
  // rows of hexagons to render for the page background effect
  // Height of hexagon (110px) plus row margin top (-32px) plus 2px margin = 80px;
  rowHeight = 81;

  // Hexagon size = 55px x 50px
  // Height of hexagon (55px) plus row margin top (-19px) plus 1px margin = 37px;
  // rowHeight = 37;


  numRowsBS = new BehaviorSubject<number>(0);
  numRows$: Observable<number> = this.numRowsBS;
  
  // numItems = 20;
  numItemsBS = new BehaviorSubject<number>(0);
  numItems$: Observable<number> = this.numItemsBS;
  rows1: any[] = [];
  rows2: any[] = [];
  scrollHeight = 0;
  scrollWidth = 0;
  
  itemWidth = 51;
  items: any[] = [];
  
  constructor(private route:ActivatedRoute,
    private scrollService: ScrollService,
    private router:Router,
    private _overlayContainer: OverlayContainer,
    @Inject(DOCUMENT) private document: Document,
    ) {
      this.applyTheme(this.theme);
    }

  ngOnInit () {
    this.initializeViewMode();
    this.contactForm.valueChanges.pipe().subscribe(changes => {
      // console.log('lP ngOI contact form value changes sub: ', changes);
    });
  }

  ngAfterViewInit(): void {
    const scrollCoords = this.scrollContainer.nativeElement.getBoundingClientRect();
    const mainCoords = this.mainContainer.nativeElement.getBoundingClientRect();
    // console.log('lP ngAVI main container coords: ', coords);
    console.log('lP ngAVI scroll width/main height: ', scrollCoords.width, mainCoords.height);

    this.scrollHeight = mainCoords.height;
    this.scrollWidth = scrollCoords.width;
    
    let numRows = Math.floor(mainCoords.height / this.rowHeight);

    numRows = numRows % 2 === 0 ? numRows : numRows - 1;

    const numItems = Math.ceil(scrollCoords.width / this.itemWidth)
    
    
    console.log('lP ngAVI numRows/numItems: ', numRows, numItems);
    this.numRowsBS.next(numRows);
    this.numItemsBS.next(numItems);
    this.updateNumRows();
    
    
  }
  
  updateNumRows() {
    const numRows = Math.floor(this.numRowsBS.value);
    // console.log('lP uNR numRows: ', numRows);
    this.rows1 = new Array(numRows);
    this.rows2 = new Array(7);
    this.items = new Array(this.numItemsBS.value);
    
  }

  handleTopnavMenuOpen() {
    // console.log('lP hTMO handle global topnav menu open called');
    this.applyTheme(this.theme);
  }

  handleContactSubmission(contact: Contact) {
    // console.log('lP hSM contact: ', contact);
  }

  handleClearForm() {

  }

  handleUpdateViewMode(mode: ViewMode) {
    console.log('lP hUVM change to view mode: ', mode);

    this.setViewModePreference(mode);
    
  }

  initializeViewMode() {
    const preferredMode = this.getViewModePreference();
    // console.log('lP iVM preferred mode: ', preferredMode);
    this.setViewModePreference(preferredMode);
  }

  getViewModePreference() {
    let preferredMode: ViewMode;
    if(localStorage.getItem('view-mode-preference')) {
      // console.log('lP gVMP view mode in local storage: ', localStorage.getItem('view-mode-preference'));
      preferredMode = localStorage.getItem('view-mode-preference') as ViewMode;
    } else {
      // console.log('lP gVMP match media: ', window.matchMedia('(prefers-color-scheme: light)').matches);
      preferredMode = window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark';
    }
    return preferredMode;
  }

  setViewModePreference(mode: ViewMode) {
    
    localStorage.setItem('view-mode-preference', mode);
    // console.log('lP sVMP set view mode in local storage: ', localStorage.getItem('view-mode-preference'));
    this.viewModeBS.next(mode);
    // console.log('lP sVMP view mode post: ', this.viewModeBS.value);
    if (mode === 'light') {
      this.theme = 'landing-page-light-theme';
    } else {
      this.theme = 'landing-page-dark-theme';
    }
  }

  scrollToTarget(target: string) {
    // console.log('lP sTT scroll target: ', target);
    this.scrollService.scrollToElementById(target);
  }

  applyTheme(theme: string): void {
    // remove old theme class and add new theme class
    const overlayContainerClasses = this._overlayContainer.getContainerElement().classList;
    // console.log('lP aT container classes pre: ', overlayContainerClasses);
    const themeClassesToRemove = Array.from(overlayContainerClasses)
    .filter((item: string) => item.includes('landing-page-'));
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    // console.log('lP aT adding theme: ', theme);
    overlayContainerClasses.add(theme);
    // console.log('lP aT container classes post: ', overlayContainerClasses);
  }



}
