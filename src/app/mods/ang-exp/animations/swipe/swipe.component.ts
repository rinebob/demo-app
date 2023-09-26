import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AnimationEvent } from '@angular/animations'
import { BehaviorSubject, Observable, Subject, fromEvent, of, take, takeUntil, withLatestFrom } from 'rxjs';

import { DisplayMode, Direction, SwipeElement, SwipeState} from '../interfaces-animations';
import { elementContainerAnimator } from '../swipe/swipe-animations';

@Component({
  selector: 'app-swipe',
  templateUrl: '../swipe/swipe.component.html',
  styleUrls: ['../swipe/swipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [elementContainerAnimator],
})
export class SwipeComponent implements AfterViewInit, OnDestroy, OnInit {
  destroy$ = new Subject<void>();
  @ViewChild('swipeContainer') swipeContainer!: ElementRef;
  @Input() displayMode: DisplayMode = DisplayMode.SINGLE_ELEMENT;
  
  windowResize$ = fromEvent(window, 'resize');
  windowInnerWidth$: Observable<number> = of(window.innerWidth);

  elements: SwipeElement[] = [
    { title: 'zero'},
    { title: 'one'},
    { title: 'two'},
    { title: 'three'},
    { title: 'four'},
    { title: 'five'},
    { title: 'six'},
  ];

  // This is the entire list of elements
  allElementsBS = new BehaviorSubject<SwipeElement[]>([]);
  allElements$: Observable<SwipeElement[]> = this.allElementsBS;

  // These are the elements that will be rendered, including the elements that are added/removed when swipe occurs
  animationElementsBS = new BehaviorSubject<SwipeElement[]>([]);
  animationElements$: Observable<SwipeElement[]> = this.animationElementsBS;

  swipeDirectionBS = new BehaviorSubject<Direction>(Direction.UNDEFINED);
  swipeDirection$: Observable<Direction> = this.swipeDirectionBS;

  swipeStateBS = new BehaviorSubject<SwipeState>(SwipeState.UNDEFINED);
  swipeState$: Observable<SwipeState> = this.swipeStateBS;

  initialMoveBS = new BehaviorSubject<boolean>(true);
  initialMove$: Observable<boolean> = this.initialMoveBS;
  
  leftElementIndexBS = new BehaviorSubject<number>(0);
  leftElementIndex$: Observable<number> = this.leftElementIndexBS;
  
  get firstElement() {
    const firstEl = this.leftElementIndexBS.value === 0;
    // console.log('sC get firstEl: ', firstEl)
    return firstEl;
  }
  
  get lastElement() {
    const lastEl = this.leftElementIndexBS.value + this.numElementsToDisplay === this.allElementsBS.value.length;
    // console.log('sC get lastEl: ', this.leftElementIndexBS.value, this.numElementsToDisplay, this.allElementsBS.value.length, lastEl)
    return lastEl;
  }
  
  readonly Direction = Direction;
  
  numElementsToDisplay = 0;
  numElementsToAnimate: number;
  displayElementIndices: number[];
  
  minThreeElementContainerWidth = 850;
  threeElementWindowWidth = 810;
  minTwoElementContainerWidth = 520;
  twoElementWindowWidth = 520;
  oneElementWindowWidth = 251;
  
  ngOnInit() {
    //console.log('sC ngOI window inner width: ', window.innerWidth);
    this.allElementsBS.next(this.elements);
    
    this.initialMove$.pipe(take(1)).subscribe(init => {
      if (init) {
        // console.log('sC ngOI initial move sub. init/firstEl/lastEl: ',  init, this.firstElement, this.lastElement);
        this.initializeNumElsToDisplay(window.innerWidth);
        this.getAnimationElements(Direction.LEFT);
        this.updateDisplayedElementIndices();
      }
    });
    
    this.swipeDirection$.pipe(
        withLatestFrom(this.initialMove$),
        takeUntil(this.destroy$)
      ).subscribe(([direction, init]) => {
      // console.log('sC ngOI swipe direction sub. direction/init: ', direction, init);
      
      if (init === true) {
        // console.log('sC ngOI swipe direction sub. init = true block');
        this.initialMoveBS.next(false);
      } else {
        // console.log('sC ngOI sD$ init = false block. direction: ', direction);
        this.getAnimationElements(direction);
        this.updateSwipeState(direction);
        this.updateLeftElementIndex(direction);
        this.updateDisplayedElementIndices();
      }
    });

    this.animationElements$.pipe(takeUntil(this.destroy$)).subscribe(elements => {
      // console.log('sC ngOI aE$ animation els sub. els/init/dirn: ',  elements);
    });

    this.leftElementIndex$.pipe(takeUntil(this.destroy$)).subscribe(ind => {
      // console.log('sC ngOI lEI$ sub: ', ind);
    });

    this.swipeState$.pipe(takeUntil(this.destroy$)).subscribe(state => {
      // console.log('sC ngOI swipe state sub.  state/init/direction: ', state);
    });
  }

  ngAfterViewInit(): void {
    // console.log('sC ngAVI t.swipeContainer: ', this.swipeContainer);
    // console.log('sC ngAVI window inner width: ', window.innerWidth);

    if (this.swipeContainer) {
      this.setSwipeContainerWidth(window.innerWidth);
      // this.initializeElements();
    }


    // this.windowResize$.pipe(
    //   debounceTime(500),
    //   takeUntil(this.destroy$)).subscribe(event => {
    //   // console.log('sC ngAVI window resize sub event: ', event);
    //   const width = (event['target'] as typeof window).innerWidth;
    //   // console.log('sC ngAVI window width: ', width);
    //   // this.initializeNumElementsToDisplay(width);
    //   if (this.swipeContainer) {
    //     // this.setSwipeContainerWidth(window.innerWidth);
    //     // this.initializeElements();
    //   }
    // });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initializeNumElsToDisplay(width: number) {
    // console.log('sC iNETD num elements to display. width/disp mode: ', width, this.displayMode);
    
    if (this.displayMode === DisplayMode.SINGLE_ELEMENT) {
      this.numElementsToDisplay = 1;
      // console.log('sC iNETD single element block.  nETD: ', this.numElementsToDisplay);
      
    } else {

      if (width > this.minThreeElementContainerWidth) {
        this.numElementsToDisplay = 3;
        // // console.log('sC iNETD width > 3 el width');
      } else if (width <= this.minThreeElementContainerWidth && width > this.minTwoElementContainerWidth) {
        this.numElementsToDisplay = 2;
        // console.log('sC iNETD width 2 < 3 el width');
      } else if (width <= this.minTwoElementContainerWidth) {
        this.numElementsToDisplay = 1;
        // console.log('sC iNETD width < 2 el width');
      }
    }
    
    this.numElementsToAnimate = this.numElementsToDisplay + 1;
    // console.log('sC iNETD final num elements to disp/animate: ', this.numElementsToDisplay, this.numElementsToAnimate);

  }

  getAnimationElements(direction: Direction) {
    const startIndex = direction === Direction.LEFT ? this.leftElementIndexBS.value : this.leftElementIndexBS.value - 1;
    // console.log('sC gAE startIndex/nETA: ', startIndex, this.numElementsToDisplay + 1);
    const els = this.allElementsBS.value.slice(startIndex, startIndex + this.numElementsToDisplay + 1);
    // console.log('sC gAE final els: ', els);
    this.animationElementsBS.next(els);
  }
  
  updateDisplayedElementIndices() {
    // console.log('sC uDEIs init lEI.v/dEIs: ', this.leftElementIndexBS.value, this.displayElementIndices);
    const inds = [];
    const startIndex = this.leftElementIndexBS.value;
    for (let i = startIndex; i < startIndex + this.numElementsToDisplay; i++) {
      inds.push(i);
    }
    // console.log('sC uDEIs not init block. start ind/final dEIs: ', startIndex, inds);
    this.displayElementIndices = inds;
  }

  setSwipeContainerWidth(viewportWidth: number) {
    // console.log('sC sSCW viewport width: ', viewportWidth);

    let numEls = this.allElementsBS.value.length;
    let width = 0;

    if (this.displayMode === DisplayMode.SINGLE_ELEMENT) {
      width = this.oneElementWindowWidth;
      // console.log('sC sSCW single element block. width: ', width);
    } else {

      // Need to set width based on viewport width and num elements to display
      // if viewport width can handle 3 elements and more than 3 elements are present,
      // set width to 3 element container width
      // But if width can handle 3 elements but only 3 or fewer are present,
      // set width to num elements - 1

      if (viewportWidth > this.minThreeElementContainerWidth) {
        // console.log('sC sSCW viewpo?rt > 3 elements width');
        
        if (numEls > 3) {
          width = this.threeElementWindowWidth;
          // console.log('sC sSCW > 3 els  block: ', width);
          
        } else {
          width = numEls === 3 ? this.twoElementWindowWidth : this.oneElementWindowWidth;
          // console.log('sC sSCW num els =/< 3  block: ', width);
          
        }

        this.numElementsToAnimate = Math.min(3, this.allElementsBS.value.length - 1);
        
      } else if (viewportWidth < this.minThreeElementContainerWidth && viewportWidth > this.minTwoElementContainerWidth) {
        // console.log('sC sSCW 2 element block');
        
        if (numEls > 3) {
          width = this.twoElementWindowWidth;
          // console.log('sC sSCW > 3 els  block: ', width);
          
        } else {
          width = this.oneElementWindowWidth;
          // console.log('sC sSCW num els =/< 3  block: ', width);
          
        }

        this.numElementsToAnimate = Math.min(2, this.allElementsBS.value.length - 1);
        
      } else if (viewportWidth <= this.minTwoElementContainerWidth) {
        // console.log('sC sSCW 1 element block');
        width = this.oneElementWindowWidth;
        this.numElementsToAnimate = Math.min(1, this.allElementsBS.value.length - 1);
      }
      
    }
    // console.log('sC sSCW final viewport width: ', width);
    this.swipeContainer.nativeElement.style.maxWidth = `${width}px`;
  }

  handleSwipe(direction: Direction) {
    // console.log('==============================');
    // console.log('sC hS handle swipe called. direction: ', direction);
    this.updateSwipeDirection(direction);
  }

  updateSwipeDirection(direction: Direction) {
    if (direction !== Direction.UNDEFINED) {
      // console.log('sC uSD init dirn/t.dEIs/fE/lE: ', direction, this.displayElementIndices, this.firstElement, this.lastElement);
      
      if (direction === Direction.RIGHT && !this.firstElement) {
        this.swipeDirectionBS.next(direction);
        
      } else if (direction === Direction.LEFT && !this.lastElement) {
        this.swipeDirectionBS.next(direction);
        
      }
    } else {
      // console.log('sC uSD dirn undefined (wtf??)');
    }
  }

  updateSwipeState(direction: Direction) {
    const swipeElementsLength = this.allElementsBS.value.length;
    // console.log('sC uSS init dirn/t.dEIs/: ', direction, this.displayElementIndices, swipeElementsLength, this.firstElement, this.lastElement);
    if (direction !== Direction.UNDEFINED) {
    if (direction === Direction.RIGHT && !this.firstElement) {
        this.swipeStateBS.next(SwipeState.SWIPE_RIGHT)
        // console.log('sC uSS right swipe block. updated swipe state: ', this.swipeStateBS.value);
        // console.log('----------------------');
      } else if (direction === Direction.LEFT && !this.lastElement) {
        this.swipeStateBS.next(SwipeState.SWIPE_LEFT)
        // console.log('sC uSS left swipe block. updated swipe state: ', this.swipeStateBS.value);
        // console.log('----------------------');
      }
    }
  }
  
  updateLeftElementIndex(direction: Direction) {
    let nextLei = 0;
    if (direction === Direction.LEFT) {
      // console.log('sC uLEI dirn=left. lastElem: ', this.lastElement);
      if (!this.lastElement) {
        nextLei = this.leftElementIndexBS.value + 1;
        // console.log('sC uLEI dirn=left nextLei: ', direction, nextLei);
        this.leftElementIndexBS.next(nextLei);
      }
    } else {
      // console.log('sC uLEI dirn=right. firstElem: ', this.firstElement);
      if (!this.firstElement) {
        const nextLei = this.leftElementIndexBS.value - 1;
        // console.log('sC uLEI dirn=right nextLei: ', direction, nextLei);
        this.leftElementIndexBS.next(nextLei);
      }
    }
  }

  checkSwipeState(event: AnimationEvent) {
    // console.log('sC cSS swipe state: ', this.swipeStateBS.value);
    // console.log('sC cSS swipe event: ', event);
  }

  handleAnimationEnd(event: AnimationEvent) {
    this.resetSwipeState();
  }

  resetSwipeState() {
    // console.log('sC rSS reset swipe state');
    this.swipeStateBS.next(SwipeState.UNDEFINED);
  }
}