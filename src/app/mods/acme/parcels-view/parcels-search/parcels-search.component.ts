import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EntitiesSearchBaseComponent } from '../../base/entities-search/entities-search.component';
import { Parcel } from '../../common/interfaces-acme';

@Component({
  selector: 'app-parcels-search',
  templateUrl: '../../base/entities-search/entities-search.component.html',
  styleUrls: ['../../base/entities-search/entities-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParcelsSearchComponent extends EntitiesSearchBaseComponent<Parcel> {

}
