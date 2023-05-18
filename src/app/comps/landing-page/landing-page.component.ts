import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import {Subject, fromEvent} from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';

import { ScrollService } from '../../services/scroll-service.service';
import { APP_SIDENAV_BUTTONS, CONTACT_MESSAGE_TEXT, CONTACT_SUBTITLE_TEXT, LANDING_PAGE_THEME_START_TEXT, RESUME_TEXT, RINEBOB_EXPERIENCE, RINEBOB_PROJECTS, RINEBOB_SKILLS, RINEHART_RESUME_TEXT_1, RINEHART_RESUME_TEXT_2, ROBERT_RINEHART_TEXT, STORAGE_BUCKET_LOCATION_TEXT, WELCOME_BUTTONS, WELCOME_TEXT } from 'src/app/common/constants';
import { AppTheme, Contact, LandingPageSection, RinebobUrl, LpScrollTargetId, ViewMode } from 'src/app/common/interfaces';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent implements AfterViewInit, OnDestroy, OnInit {
  readonly destroy$ = new Subject<void>();
  @HostBinding('class') theme = AppTheme.LANDING_PAGE_DARK;
  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  @ViewChild('mainContainer') mainContainer: ElementRef;
  destroy = new Subject<void>();
  
  contactForm = new FormGroup({
    nameControl: new FormControl(''),
    emailControl: new FormControl(''),
    messageControl: new FormControl('')
  });

  readonly RESUME_TEXT = RESUME_TEXT;
  readonly RINEBOB_SKILLS = RINEBOB_SKILLS;
  readonly RINEBOB_EXPERIENCE = RINEBOB_EXPERIENCE;
  readonly RINEBOB_PROJECTS = RINEBOB_PROJECTS;
  readonly APP_SIDENAV_BUTTONS = APP_SIDENAV_BUTTONS;
  readonly WELCOME_BUTTONS = WELCOME_BUTTONS;
  readonly ROBERT_RINEHART_TEXT = ROBERT_RINEHART_TEXT;
  readonly WELCOME_TEXT = WELCOME_TEXT;
  readonly CONTACT_MESSAGE_TEXT = CONTACT_MESSAGE_TEXT;
  readonly CONTACT_SUBTITLE_TEXT = CONTACT_SUBTITLE_TEXT;
  readonly LandingPageSection = LandingPageSection;
  readonly LpScrollTargetId = LpScrollTargetId;
  
  globalTopnavMenuCssClass = 'global-topnav-menu-css';
  fragment = '';

  viewModeToggleButtonColor: ThemePalette = 'primary';
  viewModeBS = new BehaviorSubject<ViewMode>('light');
  viewModeOn$: Observable<ViewMode> = this.viewModeBS;

  readonly RinebobUrl = RinebobUrl;

  ////////// HEXAGON ROW SIZING /////////////
  // Hexagon size = 110px x 100px
  // Height of a row of hexagons when properly aligned.  Used to calc the number of
  // rows of hexagons to render for the page background effect
  // Height of hexagon (110px) plus row margin top (-32px) plus 2px margin = 80px;
  rowHeight = 81;
  itemWidth = 51;

  // Hexagon size = 55px x 50px
  // Height of hexagon (55px) plus row margin top (-19px) plus 1px margin = 37px;
  // rowHeight = 37;
  
  numRowsBS = new BehaviorSubject<number>(0);
  rowsBS = new BehaviorSubject<any[]>(new Array(0));
  rows$: Observable<any[]> = this.rowsBS;
  
  numItemsBS = new BehaviorSubject<number>(0);
  itemsBS = new BehaviorSubject<any[]>(new Array(this.numItemsBS.value));
  items$: Observable<any[]> = this.itemsBS;
    
  constructor(private scrollService: ScrollService,
    private _overlayContainer: OverlayContainer,
    readonly storage: Storage,
    ) {
      this.applyTheme(this.theme);
      this.initializeViewportCoords();
  }
    
  ngOnInit () {
    this.initializeViewMode();
    this.contactForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(changes => {
      // console.log('lP ngOI contact form value changes sub: ', changes);
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getScreenCoords();
      this.updateNumRows();
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  initializeViewportCoords() {
    fromEvent(window, 'resize').pipe(
      debounceTime(300),
      takeUntil(this.destroy)
    ).subscribe((event: any) => {
      // console.log('lP iVC window resize sub: ', event);
      this.getScreenCoords();
      this.updateNumRows();
    });
  }

  getScreenCoords() {
    if (this.scrollContainer && this.mainContainer) {
      const scrollCoords = this.scrollContainer.nativeElement.getBoundingClientRect();
      const mainCoords = this.mainContainer.nativeElement.getBoundingClientRect();
      // console.log('lP gSC main container coords: ', mainCoords);
      // console.log('lP gSC scroll width/main height: ', scrollCoords.width, mainCoords.height);
  
      let numRows = Math.floor(mainCoords.height / this.rowHeight);
      numRows = numRows % 2 === 0 ? numRows : numRows - 1;
      const numItems = Math.ceil(scrollCoords.width / this.itemWidth)
      
      // console.log('lP gSC numRows/numItems: ', numRows, numItems);
      this.numRowsBS.next(numRows);
      this.numItemsBS.next(numItems);
    }
  }
  
  updateNumRows() {
    const numRows = Math.floor(this.numRowsBS.value);
    // console.log('lP uNR numRows: ', numRows);
    this.rowsBS.next(new Array(numRows));
    this.itemsBS.next(new Array(this.numItemsBS.value));
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
    // console.log('lP hUVM change to view mode: ', mode);
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
      this.theme = AppTheme.LANDING_PAGE_LIGHT;
    } else {
      this.theme = AppTheme.LANDING_PAGE_DARK;
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
    .filter((item: string) => item.includes(LANDING_PAGE_THEME_START_TEXT));
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    // console.log('lP aT adding theme: ', theme);
    overlayContainerClasses.add(theme);
    // console.log('lP aT container classes post: ', overlayContainerClasses);
  }

  handleDownloadResume() {
    const storageRef = ref(this.storage, STORAGE_BUCKET_LOCATION_TEXT);
    // console.log('lP hDR storage ref: ', storageRef);
    
    const pathRef = ref(storageRef, RINEHART_RESUME_TEXT_1);
    // console.log('lP hDR path ref: ', pathRef);

    getDownloadURL(pathRef)
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
          console.log('lP hDR downloaded blob: ', blob);

          const a = document.createElement('a');
          a.href = window.URL.createObjectURL(xhr.response);
          a.download = RINEHART_RESUME_TEXT_2;
          a.click();

        }
        xhr.open('GET', url);
        xhr.send();
      });
  }


}
