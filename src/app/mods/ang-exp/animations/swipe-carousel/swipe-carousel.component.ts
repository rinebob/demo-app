import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AnimationEvent } from '@angular/animations'
import { BehaviorSubject, Observable, Subject, debounceTime, fromEvent, of, take, takeUntil } from 'rxjs';

import { SwipeState, CardState, Direction, SwipeElement} from '../interfaces-animations';
import { cardContainerAnimator, individualCardAnimator } from './swipe-animations';

@Component({
  selector: 'app-swipe-carousel',
  templateUrl: './swipe-carousel.component.html',
  styleUrls: ['./swipe-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [cardContainerAnimator, individualCardAnimator],
})
export class SwipeCarouselComponent implements AfterViewInit, OnDestroy, OnInit {
  destroy$ = new Subject<void>();
  @ViewChild('swipeContainer') swipeContainer!: ElementRef;

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
    // { title: 'seven'},
    // { title: 'eight'},
    // { title: 'nine'},
  ];

  // This is the entire list of plan cards
  allElementsBS = new BehaviorSubject<SwipeElement[]>([]);
  allElements$: Observable<SwipeElement[]> = this.allElementsBS;

  // These are the cards that will be rendered, including the cards that are added/removed
  // when click/swipe occurs
  displayElementsBS = new BehaviorSubject<SwipeElement[]>([]);
  displayElements$: Observable<SwipeElement[]> = this.displayElementsBS;

  // Note: this is the opposite of swipe direction/state
  clickDirectionBS = new BehaviorSubject<Direction>(Direction.UNDEFINED);
  clickDirection$: Observable<Direction> = this.clickDirectionBS;

  priorDirectionBS = new BehaviorSubject<Direction>(Direction.UNDEFINED);
  priorDirection$: Observable<Direction> = this.priorDirectionBS;

  // swipe direction.  Updated when user clicks or swipes and we're not at the beginning/end of
  // all the cards.  Note: this is the opposite of click direction
  swipeStateBS = new BehaviorSubject<SwipeState>(SwipeState.UNDEFINED);
  swipeState$: Observable<SwipeState> = this.swipeStateBS;

  readonly Direction = Direction;

  numCardsToDisplay: number;
  displayedCardIndices: number[];
  leftSideIndex = 0;
  rightSideIndex: number;
  indicatorIndices: number[];

  leftCarouselButtonDisabled = true;
  rightCarouselButtonDisabled = false;

  minThreeCardContainerWidth = 850;
  threeCardWindowWidth = 810;
  minTwoCardContainerWidth = 520;
  twoCardWindowWidth = 520;
  oneCardWindowWidth = 270;
  
  ngOnInit() {
    console.log('sC ngOI window inner width: ', window.innerWidth);
    // this.setNumCardsToDisplay(window.innerWidth);

    this.allElementsBS.next(this.elements);

    this.windowInnerWidth$.pipe(take(1)).subscribe(width => {
      console.log('sC ngOI window inner width sub: ', width);
      this.setNumCardsToDisplay(width);
      if (this.swipeContainer) {
        this.setSwipeContainerWidth(width);
      }
    });
    
    this.clickDirection$.pipe(takeUntil(this.destroy$)).subscribe(dirn => {
      console.log('sC ngOI click direction sub: ', dirn);
      if (dirn !== Direction.UNDEFINED) {
        this.updateDisplayIndicesAndElements(dirn);
      }
    });

    this.displayElements$.pipe(takeUntil(this.destroy$)).subscribe(elements => {
      console.log('sC ngOI display inds/elements sub: ', this.displayedCardIndices, elements);
      if (elements.length !== 0) {
        this.updateSwipeState(this.clickDirectionBS.value);
      }
    });

    this.swipeState$.pipe(takeUntil(this.destroy$)).subscribe(state => {
      console.log('sC ngOI swipe state sub: ', state);
      this.updateCarouselButtonsDisabledState();
    });
  }

  ngAfterViewInit(): void {
    console.log('sC ngAVI t.swipeContainer: ', this.swipeContainer);
    // console.log('sC ngAVI window inner width: ', window.innerWidth);

    if (this.swipeContainer) {
      this.setSwipeContainerWidth(window.innerWidth);
      this.initializeCards();
    }


    this.windowResize$.pipe(
      debounceTime(500),
      takeUntil(this.destroy$)).subscribe(event => {
      console.log('sC ngAVI window resize sub event: ', event);
      const width = (event['target'] as typeof window).innerWidth;
      console.log('sC ngAVI window width: ', width);
      // this.setNumCardsToDisplay(width);
      if (this.swipeContainer) {
        // this.setSwipeContainerWidth(window.innerWidth);
        // this.initializeCards();
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Uses width of elements container div to determine how many cards to display based on card width
  // cards are hardcoded 250px wide
  // show three cards if width > 850px
  // below 850px set container width to 520px and show two cards
  // below 520px set container width to 170px and show one card
  
  setNumCardsToDisplay(width: number) {
    console.log('sC sNCTD num cards to display. rect: ', width);

    if (width > this.minThreeCardContainerWidth) {
      this.numCardsToDisplay = 3;
    } else if (width <= this.minThreeCardContainerWidth && width > this.minTwoCardContainerWidth) {
      this.numCardsToDisplay = 2;
    } else if (width <= this.minTwoCardContainerWidth) {
      this.numCardsToDisplay = 1;
    }

    const dCIs = [];
    for (let i = 0; i <= this.numCardsToDisplay; i++) {
      dCIs.push(i);
    }

    const iIs = dCIs.slice(0, this.numCardsToDisplay);
    console.log('sC sNCTD dCIs/iIs: ', dCIs, iIs);

    this.displayedCardIndices = dCIs;
    this.indicatorIndices = dCIs.slice(0, this.numCardsToDisplay);
    this.rightSideIndex = dCIs[dCIs.length -1];
    
    console.log('sC sNCTD final nCTD/dCIs/iIs/lSI/rSI: ', this.numCardsToDisplay, this.displayedCardIndices, this.indicatorIndices, this.leftSideIndex, this.rightSideIndex);
  }

  setSwipeContainerWidth(width: number) {
    if (width > this.minThreeCardContainerWidth) {
      console.log('sC sSCW 3 card block: ', width);
      this.swipeContainer.nativeElement.style.maxWidth = `${this.threeCardWindowWidth}px`;
    } else if (width < this.minThreeCardContainerWidth && width > this.minTwoCardContainerWidth) {
      console.log('sC sSCW 2 card block: ', width);
      this.swipeContainer.nativeElement.style.maxWidth = `${this.twoCardWindowWidth}px`;
    } else if (width <= this.minTwoCardContainerWidth) {
      console.log('sC sSCW 1 card block: ', width);
      this.swipeContainer.nativeElement.style.maxWidth = `${this.oneCardWindowWidth}px`;
    }
  }

  initializeCards() {
    const initialCards: SwipeElement[] = []
    for (let i = 0; i <= this.numCardsToDisplay; i++) {
      initialCards.push(this.allElementsBS.value[i]);
    }
    this.displayElementsBS.next(initialCards);
    console.log('sC iC init dispCardInds/indInds: ', this.displayedCardIndices, this.indicatorIndices);
    console.log('sC iC init cards: ', this.displayElementsBS.value);
  }

  // NOTE: 
  // A right click equals a left swipe
  // A left click equals a right swipe
  handleClick(direction: Direction) {
    console.log('==============================');
    console.log('sC hC handle click called. click direction: ', direction);
    this.clickDirectionBS.next(direction);
  }
  
  handleSwipe(direction: Direction) {
    console.log('sC hS handle swipe called. direction: ', direction);

    // to move individual cards

    // to move the cards container
    // this.updateCardsContainerSwipeState(direction);
  }

  updateDisplayIndicesAndElements(direction: Direction) {
    console.log('sC uDI update display inds/els. direction: ', direction);
    console.log('sC uDI init left/right inds/dispCardInds: ', this.leftSideIndex, this.rightSideIndex, this.displayedCardIndices);
    console.log('sC uDI init click/prior dirn: ', this.clickDirectionBS.value, this.priorDirectionBS.value);
    
    const newElements: SwipeElement[] = [];
    const newIndices: number[] = [];

    // right click / left swipe rules (opposite for left click/right swipe)
    // in a left swipe we are pulling cards from the right
    // to achieve the left swipe animation, the animation initally tranlates the container
    // on card to the right, then releases the container to revert back to its normal position
    // over the duration of the animation.
    // after a swipe, the left most displayed card is at index 1 of the list of displayed cards
    // (index 0 card is the card that was removed from the view)
    // to prepare for the next swipe,
    // we want to have the current left most displayed card to be in index 0
    // of displayed cards. this will be the one that is moved off screen to the left
    // The other cards are the second, third and fourth cards after the current left card
    // These will be placed at indices 1, 2, 3
    // Cards at indices 1 and 2 are already displayed and will move to the left
    // Card at index 3 will enter the screen from the right and be the third card displayed

    // This supports 1, 2 and 3 displayed cards
    
    // Note: if the click is a change of direction (eg left to right or right to left)
    // do not update the list of cards, just move them in the opposite direction


    // Updates displayed card indices
    // First, only change the cards if it's the same direction
    if (direction === this.priorDirectionBS.value) {
      console.log('sC uDI same direction block');

      if (direction === Direction.RIGHT) {
        console.log('sC uDI dirn right block');
        
        // next only update left/right inds if not at the end of all elements
        if (this.rightSideIndex < this.allElementsBS.value.length - 1) {
          this.leftSideIndex ++;
          this.rightSideIndex ++;
          console.log('sC uDI click right new left/right ind: ', this.leftSideIndex, this.rightSideIndex);
          
        } else {
          console.log('sC uDI click right. right ind > num els. not updating left/right inds');
          
        }
      } else if (direction === Direction.LEFT) {
        console.log('sC uDI dirn left block');
        
        // next only update left/right inds if not at the start of all elements
        if (this.leftSideIndex > 0) {
          this.leftSideIndex --;
          this.rightSideIndex --;
          console.log('sC uDI click left. left ind > 0. new left/right ind: ', this.leftSideIndex, this.rightSideIndex);
          
        } else {
          console.log('sC uDI click left. left ind = 0. not updating left ind');
        }
      }

      // Updates displayElements array (these are the rendered cards)
      // Adds number of cards to display starting at leftSideIndex plus outside card
      for(let i = this.leftSideIndex; i <= this.leftSideIndex + this.numCardsToDisplay; i++ ) {
        newIndices.push(i);
        const el = this.allElementsBS.value[i];
        newElements.push(el);
        // console.log('sC uDI ind/new element: ', i, el);
      }
      this.displayedCardIndices = newIndices;
      this.displayElementsBS.next(newElements);
      console.log('sC uDI final left ind/disp cards: ', this.leftSideIndex, this.rightSideIndex, this.displayedCardIndices);
      console.log('sC uDI new disp elements: ', this.displayElementsBS.value);

    } else {

      // different click direction
      this.displayElementsBS.next([...this.displayElementsBS.value]);
      console.log('sC uDI different direction block.  keeping existing displayed inds/els: ', this.displayedCardIndices, this.displayElementsBS.value);
    }

    // Updates the displayed cards indicator array
    if (direction === Direction.RIGHT) {
      this.indicatorIndices = this.displayedCardIndices.slice(1);
      // console.log('sC uDI dirn right new indicatorIndices: ', this.indicatorIndices);
    } else if (direction === Direction.LEFT) {
      this.indicatorIndices = this.displayedCardIndices.slice(0, this.numCardsToDisplay);
      // console.log('sC uDI dirn left new indicatorIndices: ', this.indicatorIndices);
    }
    // prepare for next click
    this.priorDirectionBS.next(direction);
  }

  updateSwipeState(direction: Direction) {
    const swipeElementsLength = this.allElementsBS.value.length;
    if (direction !== Direction.UNDEFINED) {
      // console.log('sC uSS dirn left/right ind/num swipe els: ', direction, this.leftSideIndex, this.rightSideIndex, swipeElementsLength);
    }
    if (direction === Direction.RIGHT && this.rightSideIndex < swipeElementsLength) {
        
      // right click = left swipe
      this.swipeStateBS.next(SwipeState.SWIPE_LEFT)
      console.log('sC uSS right click block. updated swipe state: ', this.swipeStateBS.value);
    } else if (direction === Direction.LEFT && this.leftSideIndex >= 0) {
    
      // left click = right swipe
      this.swipeStateBS.next(SwipeState.SWIPE_RIGHT)
      console.log('sC uSS left click block. updated swipe state: ', this.swipeStateBS.value);
    }
  }

  updateCarouselButtonsDisabledState() {
    console.log('sC uCBDS init lef/right inds: ', this.leftSideIndex, this.rightSideIndex);
    this.leftCarouselButtonDisabled = this.indicatorIndices[0] <= 0;
    this.rightCarouselButtonDisabled = this.indicatorIndices[this.indicatorIndices.length - 1] >= this.allElementsBS.value.length - 1;
    console.log('sC uCBDS final left/right button disabled states: ', this.leftCarouselButtonDisabled, this.rightCarouselButtonDisabled);
  }

  checkSwipeState(event: AnimationEvent) {
    //console.log('sC cSS swipe state: ', this.swipeState);
    //console.log('sC cSS swipe event: ', event);

  }

  resetSwipeState(event: AnimationEvent) {
    
    // console.log('sC rAS reset swipe state');
    this.swipeStateBS.next(SwipeState.UNDEFINED);
  }

}
