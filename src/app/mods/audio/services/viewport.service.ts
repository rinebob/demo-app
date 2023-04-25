import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { VIEWPORT_MIN_SIZE } from '../common/au-constants';
import { ViewportMode } from '../common/au-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ViewportService {

  viewportModeBS = new BehaviorSubject<ViewportMode>(ViewportMode.DESKTOP);
  viewportMode$: Observable<ViewportMode> = this.viewportModeBS;

  constructor() { 
  }

  updateViewportMode(width: number) {
    // console.log('vS uVM inner width: ', width);

    let viewportMode: ViewportMode;
    
    const desktopMin = VIEWPORT_MIN_SIZE.get(ViewportMode.DESKTOP)!;
    const tabletMin = VIEWPORT_MIN_SIZE.get(ViewportMode.TABLET)!;
    
    if (width > desktopMin) {
      viewportMode = ViewportMode.DESKTOP;
    } else if (width < desktopMin && width >= tabletMin ) {
      viewportMode = ViewportMode.TABLET;
    } else {
      viewportMode = ViewportMode.MOBILE;
    }

    this.viewportModeBS.next(viewportMode);
    
    // console.log('vS uVM final viewport mode: ', viewportMode);

  }
}
