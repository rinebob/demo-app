import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { GuidedTourMetadata } from 'src/app/common/interfaces';

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

  constructor() {}

  
  handleSelectNextBubble() {
    // console.log('tB hSNS next stop called');
    this.next.emit();
  }
  
  handleCloseTour() {
    // console.log('tB hCT close tour called');
    this.closeTour.emit();
  }
}



