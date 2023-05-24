import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EntitiesSearchBaseComponent } from '../../base/entities-search/entities-search.component';
import { Vehicle } from '../../common/interfaces-acme';

@Component({
  selector: 'app-vehicles-search',
  templateUrl: '../../base/entities-search/entities-search.component.html',
  styleUrls: ['../../base/entities-search/entities-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehiclesSearchComponent extends EntitiesSearchBaseComponent<Vehicle> {

}
