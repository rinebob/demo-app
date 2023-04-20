import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AppText } from '../../common/au-interfaces';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-breadcrumb-panel',
  templateUrl: './breadcrumb-panel.component.html',
  styleUrls: ['./breadcrumb-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbPanelComponent {
  @Input() 
  set url(url: string) {
    // console.log('bP @i input url: ', url);
    this.urlBS.next(url);
  }
  get url() {
    return this.urlBS.value;
  }
  urlBS = new BehaviorSubject<string>('');

  readonly AppText = AppText;
}
