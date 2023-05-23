import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ColumnMetadata, EntityBase } from '../../common/interfaces-acme';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-entities-table',
  templateUrl: './entities-table.component.html',
  styleUrls: ['./entities-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntitiesTableBaseComponent<T extends EntityBase> {
  @Input() 
  set entities(entities: T[]) {
    this.entitiesBS.next(entities);
    // console.log('eT @i entities: ', this.entitiesBS.value);
  };
  get entities() {
    return this.entitiesBS.value;
  };
  entitiesBS = new BehaviorSubject<T[]>([]);
  
  @Input()
  set columnMetadata(columns: ColumnMetadata[]) {
    this.columnsBS.next(columns);
    this.displayedColumns = this.getDisplayedColumns();
    // console.log('eT @i columnMetadata: ', columns);
  }
  get columnMetadata() {
    return this.columnsBS.value;
  }
  columnsBS = new BehaviorSubject<ColumnMetadata[]>([]);

  displayedColumns: string[] = [];

  getDisplayedColumns() {
    let columns: string[] = [];
    this.columnMetadata.forEach(column => columns.push(column.columnName));
    
    // console.log('eT gDC displayedColumns: ', columns);
    return columns;
  }
}
