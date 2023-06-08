import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private currentUrlBS = new BehaviorSubject<string>('');
  private previousUrlBS = new BehaviorSubject<string>('/audio/home');
  public previousUrl$: Observable<string> = this.previousUrlBS;

  constructor(private router: Router,) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe( event => {
      this.previousUrlBS.next(this.currentUrlBS.value);
      const url = (event as NavigationEnd).url.toString();
      this.currentUrlBS.next(url);
      // console.log('uS ctor url service. cur/prev: ', this.currentUrlBS.value, this.previousUrlBS.value);
      
    });
   }
}
