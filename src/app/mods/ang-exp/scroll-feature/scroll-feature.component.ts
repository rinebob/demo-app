import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Item {
  title: string;
}

@Component({
  selector: 'app-scroll-feature',
  templateUrl: './scroll-feature.component.html',
  styleUrls: ['./scroll-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollFeatureComponent {

  items: Item[] = [
    { title: 'zero'},
    { title: 'one'},
    { title: 'two'},
    { title: 'three'},
    { title: 'four'},
    { title: 'five'},
    { title: 'six'},
    // { title: 'seven'},
    // { title: 'eight'},
    // { title: 'nine'},
  ];

  itemsBS = new BehaviorSubject<Item[]>(this.items);
  items$: Observable<Item[]> = this.itemsBS;

}
