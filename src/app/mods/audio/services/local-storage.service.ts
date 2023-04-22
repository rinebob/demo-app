import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private cartBS = new BehaviorSubject<string>('')
  public cart$: Observable<string> = this.cartBS;

  constructor() { }

  public saveData(key: string, value: string) {
    // console.log('lSS sD saving data to storage: ', value);
    localStorage.setItem(key, value);
    this.cartBS.next(value);
  }

  public getData(key: string) {
    const data = localStorage.getItem(key);
    // console.log('lSS gD storage cart: ', data);
    if (data) {
      this.cartBS.next(data);
      
    }
    return data;
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
    this.cartBS.next('');
  }

  public clearData() {
    localStorage.clear();
    this.cartBS.next('');
  }

  
}
