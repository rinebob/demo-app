import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { GuidedTourMetadata, TourStop } from 'src/app/common/interfaces';
import { GUIDED_TOUR_TEXT } from 'src/app/common/constants';

@Component({
  selector: 'app-guided-tour',
  templateUrl: './guided-tour.component.html',
  styleUrls: ['./guided-tour.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuidedTourComponent implements OnInit {
  
  // @Input() selectedBubble: GuidedTourMetadata | undefined = undefined;
  @Output() next = new EventEmitter<GuidedTourMetadata>();
  @Output() closeTour = new EventEmitter<void>();

  readonly GUIDED_TOUR_TEXT = GUIDED_TOUR_TEXT;
  readonly TourStop = TourStop;
  selectedBubbleBS = new BehaviorSubject<GuidedTourMetadata|undefined>(undefined);
  selectedBubble$: Observable<GuidedTourMetadata|undefined> = this.selectedBubbleBS;

  currentStop = 1;
  numStops = GUIDED_TOUR_TEXT.length;

  constructor() {
    
  }

  ngOnInit() {
    this.initializeTour();
  }

  initializeTour() {
    this.selectedBubbleBS.next(GUIDED_TOUR_TEXT[this.currentStop]);
    this.currentStop ++;
    console.log('gT ctor first tour stop: ', this.selectedBubbleBS.value);
  }

  handleSelectNextBubble() {
    console.log('tB hSNS next stop called.  bubble: ', this.selectedBubbleBS.value);
    this.next.emit(this.selectedBubbleBS.value);
  }
  
  // handleCloseTour() {
  //   console.log('tB hCT close tour called');
  //   this.closeTour.emit();

  // }

  handleNextTourStop() {
    this.selectedBubbleBS.next(GUIDED_TOUR_TEXT[this.currentStop]);
    this.currentStop ++;
    console.log('bV hNTS tour stop: ', this.selectedBubbleBS.value);


    // if (this.selectedBubbleBS.value) {
    //   if (this.selectedBubbleBS.value.order === this.numStops) {
    //     this.handleCancelTour();
    //   } else {
    //     const nextInd = this.selectedBubbleBS.value.order < this.numStops ? this.selectedBubbleBS.value.order + 1 : 2;
    //     this.selectedBubbleBS.next(GUIDED_TOUR_TEXT[nextInd])
    //     console.log('bV hNTS next tour stop: ', this.selectedBubbleBS.value);
    //   }
    // }
  }
  
  handleCancelTour() {
    this.selectedBubbleBS.next(undefined);
    this.currentStop = 1;
    // console.log('bV hCT cancel tour: ', this.selectedBubbleBS.value);
  }



}



