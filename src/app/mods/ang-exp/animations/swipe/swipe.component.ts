import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AnimationEvent } from '@angular/animations'
import { BehaviorSubject, Observable, Subject, debounceTime, fromEvent, of, take, takeUntil } from 'rxjs';

import { SwipeState, ElementState, Direction, SwipeElement} from '../interfaces-animations';
import { elementContainerAnimator } from './swipe-animations';

enum DisplayMode {
  SINGLE_ELEMENT = 'single-element',
  MULTI_ELEMENT = 'multi-element',
}

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [elementContainerAnimator],
})
export class SwipeComponent implements AfterViewInit, OnDestroy, OnInit {
  destroy$ = new Subject<void>();
  @ViewChild('swipeContainer') swipeContainer!: ElementRef;
  // @Input() displayMode: DisplayMode = DisplayMode.SINGLE_ELEMENT;
  @Input() displayMode: DisplayMode = DisplayMode.MULTI_ELEMENT;

  windowResize$ = fromEvent(window, 'resize');
  windowInnerWidth$: Observable<number> = of(window.innerWidth);

  elements: SwipeElement[] = [
    { title: 'zero'},
    { title: 'one'},
    { title: 'two'},
    { title: 'three'},
    // { title: 'four'},
    // { title: 'five'},
    // { title: 'six'},
  ];

  // This is the entire list of elements
  allElementsBS = new BehaviorSubject<SwipeElement[]>([]);
  allElements$: Observable<SwipeElement[]> = this.allElementsBS;

  // These are the elements that will be rendered, including the elements that are added/removed when swipe occurs
  animationElementsBS = new BehaviorSubject<SwipeElement[]>([]);
  animationElements$: Observable<SwipeElement[]> = this.animationElementsBS;

  swipeDirectionBS = new BehaviorSubject<Direction>(Direction.UNDEFINED);
  swipeDirection$: Observable<Direction> = this.swipeDirectionBS;

  priorDirectionBS = new BehaviorSubject<Direction>(Direction.UNDEFINED);
  priorDirection$: Observable<Direction> = this.priorDirectionBS;

  // Updated when user swipes and we're not at the beginning/end of
  // all the elements. 
  swipeStateBS = new BehaviorSubject<SwipeState>(SwipeState.UNDEFINED);
  swipeState$: Observable<SwipeState> = this.swipeStateBS;

  // for mobile - one plan
  selectedElementBS = new BehaviorSubject<SwipeElement | undefined>(undefined);
  selectedElement$: Observable<SwipeElement | undefined> = this.selectedElementBS;

  elementIndexBS = new BehaviorSubject<number>(0);
  elementIndex$: Observable<number> = this.elementIndexBS;
  //animationState: string;

  readonly Direction = Direction;

  numElementsToAnimate: number;
  animationElementIndices: number[];
  leftAnimationIndex = 0;
  rightAnimationIndex = 0;
  
  displayElementIndices: number[];
  
  get leftDisplayIndex() {
    return this.displayElementIndices[0];
  }
  get rightDisplayIndex() {
    return this.displayElementIndices[this.displayElementIndices.length - 1];
  }

  leftCarouselButtonDisabled = true;
  rightCarouselButtonDisabled = false;

  minThreeElementContainerWidth = 850;
  threeElementWindowWidth = 810;
  minTwoElementContainerWidth = 520;
  twoElementWindowWidth = 520;
  oneElementWindowWidth = 270;

  showSimpleSwipeFeature = false;
  showMultiElementSwipeFeature = true;
  
  ngOnInit() {
    //console.log('sC ngOI window inner width: ', window.innerWidth);
    this.allElementsBS.next(this.elements);
    
    this.initializeNumElementsToDisplay(window.innerWidth);
    this.setElementIndices();
    this.initializeElements();

    // this.windowInnerWidth$.pipe(take(1)).subscribe(width => {
    //   //console.log('sC ngOI window inner width sub: ', width);
    //   // this.initializeNumElementsToDisplay(width);
    //   if (this.swipeContainer) {
    //     // this.setSwipeContainerWidth(width);
    //   }
    // });
    
    this.swipeDirection$.pipe(takeUntil(this.destroy$)).subscribe(dirn => {
      console.log('sC ngOI swipe direction sub: ', dirn);
      if (dirn !== Direction.UNDEFINED) {
        this.updateDisplayElementsAndIndices(dirn);
      }
    });

    this.animationElements$.pipe(takeUntil(this.destroy$)).subscribe(elements => {
      console.log('sC ngOI display els sub. inds/els: ', this.animationElementIndices, elements);
      if (elements.length !== 0) {
        this.updateSwipeState(this.swipeDirectionBS.value);
      }
    });

    this.swipeState$.pipe(takeUntil(this.destroy$)).subscribe(state => {
      console.log('sC ngOI swipe state sub: ', state);
      // this.updateCarouselButtonsDisabledState();
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

  initializeNumElementsToDisplay(width: number) {
    console.log('sC sNCTD num elements to display. width/disp mode: ', width, this.displayMode);
    
    if (this.displayMode === DisplayMode.SINGLE_ELEMENT) {
      this.numElementsToAnimate = 1;
      
    } else {

      if (width > this.minThreeElementContainerWidth) {
        this.numElementsToAnimate = 3;
        console.log('sC sNCTD width > 3 el width');
      } else if (width <= this.minThreeElementContainerWidth && width > this.minTwoElementContainerWidth) {
        this.numElementsToAnimate = 2;
        console.log('sC sNCTD width 2 < 3 el width');
      } else if (width <= this.minTwoElementContainerWidth) {
        this.numElementsToAnimate = 1;
        console.log('sC sNCTD width < 2 el width');
      }
      
      // if (width > this.minThreeElementContainerWidth) {
      //   this.numElementsToAnimate = Math.min(3, this.allElementsBS.value.length - 1);
      //   console.log('sC sNCTD width > 3 el width');
      // } else if (width <= this.minThreeElementContainerWidth && width > this.minTwoElementContainerWidth) {
      //   this.numElementsToAnimate = Math.min(2, this.allElementsBS.value.length - 1);
      //   console.log('sC sNCTD width 2 < 3 el width');
      // } else if (width <= this.minTwoElementContainerWidth) {
      //   this.numElementsToAnimate = 1;
      //   console.log('sC sNCTD width < 2 el width');
      // }
    }
    
    console.log('sC sNCTD final num elements: ', this.numElementsToAnimate);

  }

  setElementIndices() {
    const aEIs = [];
    for (let i = 0; i <= this.numElementsToAnimate; i++) {
      aEIs.push(i);
    }
    
    const dEIs = aEIs.slice(0, this.numElementsToAnimate);
    console.log('sC sDEI aEIs/dEIs: ', aEIs, dEIs);

    this.animationElementIndices = aEIs;
    this.displayElementIndices = dEIs;
    this.rightAnimationIndex = aEIs[aEIs.length -1];
    
    console.log('sC sDEI final nETD/aEIs/dEIs/lAI/rAI/: ', this.numElementsToAnimate, this.animationElementIndices, this.displayElementIndices);
    console.log('sC sDEI final lAI/rAI/lDI/rDI: ', this.leftAnimationIndex, this.rightAnimationIndex, this.leftDisplayIndex, this.rightDisplayIndex);
  }

  initializeElements() {
    const initialElements: SwipeElement[] = []
    for (let i = 0; i <= this.numElementsToAnimate; i++) {
      initialElements.push(this.allElementsBS.value[i]);
    }
    this.animationElementsBS.next(initialElements);
    console.log('sC iE init animElementInds/dispInds: ', this.animationElementIndices, this.displayElementIndices);
    console.log('sC iE init elements: ', this.animationElementsBS.value);
  }

  setSwipeContainerWidth(viewportWidth: number) {
    console.log('sC sSCW viewport width: ', viewportWidth);

    let numEls = this.allElementsBS.value.length;
    let width = 0;

    if (this.displayMode === DisplayMode.SINGLE_ELEMENT) {
      width = this.oneElementWindowWidth;
      console.log('sC sSCW single element block. width: ', width);
    } else {

      // if (width > this.minThreeElementContainerWidth) {
      //   this.numElementsToAnimate = Math.min(3, this.allElementsBS.value.length - 1);
      // } else if (width <= this.minThreeElementContainerWidth && width > this.minTwoElementContainerWidth) {
      //   this.numElementsToAnimate = Math.min(2, this.allElementsBS.value.length - 1);
      // } else if (width <= this.minTwoElementContainerWidth) {
      //   this.numElementsToAnimate = 1;
      // }

      // Need to set width based on viewport width and num elements to display
      // if viewport width can handle 3 elements and more than 3 elements are present,
      // set width to 3 element container width
      // But if width can handle 3 elements but only 3 or fewer are present,
      // set width to num elements - 1

      if (viewportWidth > this.minThreeElementContainerWidth) {
        console.log('sC sSCW viewport > 3 elements width');
        
        if (numEls > 3) {
          width = this.threeElementWindowWidth;
          console.log('sC sSCW > 3 els  block: ', width);
          
        } else {
          width = numEls === 3 ? this.twoElementWindowWidth : this.oneElementWindowWidth;
          console.log('sC sSCW num els =/< 3  block: ', width);
          
        }

        this.numElementsToAnimate = Math.min(3, this.allElementsBS.value.length - 1);
        
      } else if (viewportWidth < this.minThreeElementContainerWidth && viewportWidth > this.minTwoElementContainerWidth) {
        console.log('sC sSCW 2 element block');
        
        if (numEls > 3) {
          width = this.twoElementWindowWidth;
          console.log('sC sSCW > 3 els  block: ', width);
          
        } else {
          width = this.oneElementWindowWidth;
          console.log('sC sSCW num els =/< 3  block: ', width);
          
        }

        this.numElementsToAnimate = Math.min(2, this.allElementsBS.value.length - 1);
        
      } else if (viewportWidth <= this.minTwoElementContainerWidth) {
        console.log('sC sSCW 1 element block');
        width = this.oneElementWindowWidth;
        this.numElementsToAnimate = Math.min(1, this.allElementsBS.value.length - 1);
      }
      
      console.log('sC sSCW final viewport width: ', width);
      this.swipeContainer.nativeElement.style.maxWidth = `${width}px`;
    }
  }

  updateSwipeDirection(direction: Direction) {
    
    if (direction !== Direction.UNDEFINED) {
      console.log('sC uSD init dirn/lAI/rAI/lDI/rDI: ', direction, this.leftAnimationIndex, this.rightAnimationIndex, this.leftDisplayIndex, this.rightDisplayIndex);
      console.log('sC uSD num all els: ', this.allElementsBS.value.length);
      
      if (direction === Direction.RIGHT && this.leftDisplayIndex > 0) {
        
        this.swipeDirectionBS.next(Direction.RIGHT)
        console.log('sC uSD right swipe block. updated swipe direction: ', this.swipeDirectionBS.value);

      } else if (direction === Direction.LEFT && this.rightDisplayIndex < this.allElementsBS.value.length - 1) {
        
        this.swipeDirectionBS.next(Direction.LEFT)
        console.log('sC uSD left swipe block. updated swipe direction: ', this.swipeDirectionBS.value);

      }
    } else {
      console.log('sC uSD dirn undefined (wtf??)');

    }
  }

  updateDisplayElementsAndIndices(direction: Direction) {
    console.log('sC uDEAI update display inds/els. init direction: ', direction);
    console.log('sC uDEAI init lAI/rAI/lDI/rDI: ', this.leftAnimationIndex, this.rightAnimationIndex, this.leftDisplayIndex, this.rightDisplayIndex);
    console.log('sC uDEAI init swipe/prior dirn: ', this.swipeDirectionBS.value, this.priorDirectionBS.value);
    
    const newElements: SwipeElement[] = [];
    const newIndices: number[] = [];

    // First, only change the elements if it's the same direction
    if (direction === this.priorDirectionBS.value) {
      console.log('sC uDEAI same direction block');

      if (direction === Direction.LEFT) {
        console.log('sC uDEAI dirn left block. rDI < num all els - 1: ', this.rightDisplayIndex < this.allElementsBS.value.length - 1);
        
        // next only update left/right inds if not at the end of all elements
        if (this.rightDisplayIndex < this.allElementsBS.value.length - 1) {
          this.leftAnimationIndex ++;
          this.rightAnimationIndex ++;
          console.log('sC uDEAI swipe left. rDI < all els - 1. new lAI/rAI/lDI/rDI: ', this.leftAnimationIndex, this.rightAnimationIndex, this.leftDisplayIndex, this.rightDisplayIndex);
          
        } else {
          console.log('sC uDEAI swipe left. right ind > num els. not updating left/right inds');
          
        }
      } else if (direction === Direction.RIGHT) {
        console.log('sC uDEAI dirn right block');
        
        // next only update left/right inds if not at the start of all elements
        if (this.leftDisplayIndex > 0) {
          this.leftAnimationIndex --;
          this.rightAnimationIndex --;
          console.log('sC uDEAI swipe right. lDI > 0. new lAI/rAI/lDI/rDI: ', this.leftAnimationIndex, this.rightAnimationIndex, this.leftDisplayIndex, this.rightDisplayIndex);
          
        } else {
          console.log('sC uDEAI swipe right. left ind = 0. not updating left ind');
        }
      }

      // Updates animationElements array (these are the rendered elements plus the outside element)
      // Adds number of elements to display starting at leftAnimationIndex plus outside element
      for(let i = this.leftAnimationIndex; i <= this.leftAnimationIndex + this.numElementsToAnimate; i++ ) {
        newIndices.push(i);
        const el = this.allElementsBS.value[i];
        newElements.push(el);
        // console.log('sC uDEAI ind/new element: ', i, el);
      }
      this.animationElementIndices = newIndices;
      this.animationElementsBS.next(newElements);
      console.log('sC uDEAI new disp elements: ', this.animationElementsBS.value);
      console.log('sC uDEAI final lAI/rAI/lDI/rDI/t.aEIs/t.dEIs: ', this.leftAnimationIndex, this.rightAnimationIndex,  this.leftDisplayIndex, this.rightDisplayIndex, this.animationElementIndices, this.animationElementIndices, this.displayElementIndices);

    } else {

      // different click direction
      this.animationElementsBS.next([...this.animationElementsBS.value]);
      console.log('sC uDEAI different direction block.  keeping existing displayed inds');

      console.log('sC uDEAI unchanged lAI/rAI/lDI/rDI/t.aEIs/t.dEIs: ', this.leftAnimationIndex, this.rightAnimationIndex,  this.leftDisplayIndex, this.rightDisplayIndex, this.animationElementIndices, this.animationElementIndices, this.displayElementIndices);
      console.log('sC uDEAI unchanged swipe/prior dirn: ', this.swipeDirectionBS.value, this.priorDirectionBS.value);
    }

    // Updates the displayed elements indicator array
    if (direction === Direction.LEFT) {
      this.displayElementIndices = this.animationElementIndices.slice(1);
      console.log('sC uDEAI dirn left new displayElementIndices: ', this.displayElementIndices);
    } else if (direction === Direction.RIGHT) {
      this.displayElementIndices = this.animationElementIndices.slice(0, this.numElementsToAnimate);
      console.log('sC uDEAI dirn right new displayElementIndices: ', this.displayElementIndices);
    }
    // prepare for next click
    this.priorDirectionBS.next(direction);
  }
  
  handleSwipe(direction: Direction) {
    console.log('==============================');
    console.log('sC hS handle swipe called. direction: ', direction);
    
    this.updateSwipeDirection(direction);
  }

  updateSwipeState(direction: Direction) {
    const swipeElementsLength = this.allElementsBS.value.length;
    if (direction !== Direction.UNDEFINED) {
      console.log('sC uSS init dirn/lAI/rAI/lDI/rDI/num swipe els: ', direction, this.leftAnimationIndex, this.rightAnimationIndex, this.leftDisplayIndex, this.rightDisplayIndex, swipeElementsLength);

      if (direction === Direction.RIGHT && this.leftDisplayIndex >= 0) {
        
        this.swipeStateBS.next(SwipeState.SWIPE_RIGHT)
        console.log('sC uSS right swipe block. updated swipe state: ', this.swipeStateBS.value);
  
      } else if (direction === Direction.LEFT && this.rightDisplayIndex <= swipeElementsLength - 1) {
      
        this.swipeStateBS.next(SwipeState.SWIPE_LEFT)
        console.log('sC uSS left swipe block. updated swipe state: ', this.swipeStateBS.value);
      }
    }
  }

  checkSwipeState(event: AnimationEvent) {
    // console.log('sC cSS swipe state: ', this.swipeStateBS.value);
    // console.log('sC cSS swipe event: ', event);

  }

  handleAnimationEnd(event: AnimationEvent) {
    this.resetSwipeState();
    // console.log('=============================');
    // console.log('s hAE done event: ', event);


    
    // this.updateDisplayElementsAndIndices(this.swipeDirectionBS.value);
  }

  resetSwipeState() {
    
    // console.log('sC rSS reset swipe state');
    this.swipeStateBS.next(SwipeState.UNDEFINED);
  }

  
  
}