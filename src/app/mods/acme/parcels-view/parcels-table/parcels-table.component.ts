import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EntitiesTableBaseComponent } from '../../base/entities-table/entities-table.component';
import { Parcel } from '../../common/interfaces-acme';

@Component({
  selector: 'app-parcels-table',
  templateUrl: '../../base/entities-table/entities-table.component.html',
  styleUrls: ['../../base/entities-table/entities-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParcelsTableComponent extends EntitiesTableBaseComponent<Parcel> {

}
