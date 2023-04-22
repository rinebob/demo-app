import { Component, OnInit } from '@angular/core';

// import { AudioState } from './common/au-interfaces';
import { AudioStore } from './services/audio-store.service';
// import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-audio-view',
  templateUrl: './audio-view.component.html',
  styleUrls: ['./audio-view.component.scss']
})
export class AudioViewComponent implements OnInit {

  customer$ = this.audioStore.customer$;
  cart$ = this.audioStore.cart$;
  order$ = this.audioStore.order$;

  // storageCart$ = this.localStorage.cart$;

  constructor(readonly audioStore: AudioStore,
    //  readonly localStorage: LocalStorageService
     ) {

  }
  
  ngOnInit(): void {
    this.customer$.pipe().subscribe(value => {
      // console.log('aV ngOI store customer sub: ', value);
    });
    
    this.cart$.pipe().subscribe(value => {
      // console.log('aV ngOI store cart sub: ', value);
      const jsonData = JSON.stringify(value)
    });
    
    this.order$.pipe().subscribe(value => {
      // console.log('aV ngOI store order sub: ', value);
    });

    this.checkLocalStorage();

    // this.storageCart$.pipe().subscribe(cart => {
    //   // console.log('aV ngOI storage cart sub: ', cart);
    // });

    
  }

  checkLocalStorage() {
    // const cart = this.localStorage.getData('cart');
    // console.log('aV cLS cart from local storage: ', cart);
  }

}
