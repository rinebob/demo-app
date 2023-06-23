import { TestBed } from '@angular/core/testing';

import { ViewportService } from './viewport.service';
import { take } from 'rxjs';
import { ViewportMode } from '../common/au-interfaces';

describe('ViewportService', () => {
  let service: ViewportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update the viewport mode', () => {
    const detectMode = (width: number) => {
      let mode: ViewportMode = ViewportMode.DESKTOP;
      service.updateViewportMode(width);
      service.viewportMode$.pipe(take(1)).subscribe(vm => {
        mode = vm;
      });

      return mode;
    }

    expect(detectMode(501)).toEqual(ViewportMode.MOBILE);
    expect(detectMode(792)).toEqual(ViewportMode.TABLET);
    expect(detectMode(1597)).toEqual(ViewportMode.DESKTOP);
  })
});
