import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from '@angular/core';

import { HOME_FEATURE_TEXT } from '../../common/au-constants';
import { AppText, ViewportMode } from '../../common/au-interfaces';
import { ViewportService } from '../../services/viewport.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-home-feature',
  templateUrl: './home-feature.component.html',
  styleUrls: ['./home-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeFeatureComponent implements OnDestroy, OnInit {
  readonly destroy$ = new Subject<void>();
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // console.log('cP oR inner width: ', window.innerWidth);
    this.viewportService.updateViewportMode(window.innerWidth);
  }

  viewportMode: ViewportMode = ViewportMode.DESKTOP;
  viewportMode$ = this.viewportService.viewportMode$;
  readonly ViewportMode = ViewportMode;

  sourceUrl = '../../../../../assets/audio/home';
  get imageUrl() {
    return `${this.sourceUrl}/${this.viewportMode}`
  }

  readonly AppText = AppText;
  readonly HOME_FEATURE_TEXT = HOME_FEATURE_TEXT;

  constructor(readonly viewportService: ViewportService) {
    this.viewportMode$.pipe(takeUntil(this.destroy$)).subscribe(mode => {
      // console.log('hF ctor viewport mode sub: ', mode);
      this.viewportMode = mode;
      // console.log('hF ctor image url: ', this.imageUrl)
      
    });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.viewportService.updateViewportMode(window.innerWidth);
  }

  getImageUrl(image: string) {
    const img = this.imageUrl + '/' + image;
    return img;
  }

}
