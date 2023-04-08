import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';

import { GuidedTourMetadata, TourStop } from 'src/app/common/interfaces';
import { GUIDED_TOUR_TEXT } from 'src/app/common/constants';

@Component({
  selector: 'app-guided-tour',
  templateUrl: './guided-tour.component.html',
  styleUrls: ['./guided-tour.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuidedTourComponent {
  
  @Input() selectedBubble: GuidedTourMetadata | undefined = undefined;
  @Output() next = new EventEmitter<void>();
  @Output() closeTour = new EventEmitter<void>();

  constructor() {
    // console.log('gT ctor selected bubble: ', this.selectedBubble);
  }

  handleSelectNextBubble() {
    // console.log('tB hSNS next stop called.  bubble: ', this.selectedBubbleBS.value);
    this.next.emit();
  }
  
  handleCloseTour() {
    // console.log('tB hCT close tour called');
    this.closeTour.emit();

  }



}



