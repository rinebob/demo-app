import { Component, OnDestroy, OnInit } from '@angular/core';

// import { AudioState } from './common/au-interfaces';
import { AudioStore } from './services/audio-store.service';
// import { LocalStorageService } from './services/local-storage.service';
import { ScrollService } from '../../services/scroll-service.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-audio-view',
  templateUrl: './audio-view.component.html',
  styleUrls: ['./audio-view.component.scss']
})
export class AudioViewComponent implements OnDestroy, OnInit {
  readonly destroy$ = new Subject<void>();
  customer$ = this.audioStore.customer$;
  cart$ = this.audioStore.cart$;
  order$ = this.audioStore.order$;

  // storageCart$ = this.localStorage.cart$;

  constructor(readonly audioStore: AudioStore,
              private scrollService: ScrollService,
    //  readonly localStorage: LocalStorageService
     ) {

  }
  
  ngOnInit(): void {
    this.customer$.pipe(takeUntil(this.destroy$)).subscribe(value => {
      // console.log('aV ngOI store customer sub: ', value);
    });
    
    // this.cart$.pipe(takeUntil(this.destroy$)).subscribe(value => {
    //   console.log('aV ngOI store cart sub: ', value);
    //   const jsonData = JSON.stringify(value)
    // });
    
    // this.order$.pipe(takeUntil(this.destroy$)).subscribe(value => {
    //   console.log('aV ngOI store order sub: ', value);
    // });

    this.checkLocalStorage();

    // this.storageCart$.pipe(takeUntil(this.destroy$)).subscribe(cart => {
    //   // console.log('aV ngOI storage cart sub: ', cart);
    // });

    
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  checkLocalStorage() {
    // const cart = this.localStorage.getData('cart');
    // console.log('aV cLS cart from local storage: ', cart);
  }

  scrollToTarget(target: string) {
    // console.log('lP sTT scroll target: ', target);
    this.scrollService.scrollToElementById('top');
  }

}
