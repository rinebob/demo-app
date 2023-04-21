import { Component, OnInit } from '@angular/core';

import { AudioState } from './common/au-interfaces';
import { AudioStore } from './services/audio-store.service';

@Component({
  selector: 'app-audio-view',
  templateUrl: './audio-view.component.html',
  styleUrls: ['./audio-view.component.scss']
})
export class AudioViewComponent implements OnInit {

  customer$ = this.audioStore.customer$;
  cart$ = this.audioStore.cart$;
  order$ = this.audioStore.order$;

  constructor(readonly audioStore: AudioStore) {

  }
  
  ngOnInit(): void {
    this.customer$.pipe().subscribe(value => {
      // console.log('aV ngOI store customer sub: ', value);
    });
    
    this.cart$.pipe().subscribe(value => {
      console.log('aV ngOI store cart sub: ', value);
    });
    
    this.order$.pipe().subscribe(value => {
      // console.log('aV ngOI store order sub: ', value);
    });
    
  }

}
