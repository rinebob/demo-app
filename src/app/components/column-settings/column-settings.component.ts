import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, QueryList, ViewChildren } from '@angular/core';
import { MatCheckbox} from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import { TaskStatus, TASK_STATUS_VALUES, DialogData, DialogCloseResult } from '../../common/interfaces';

@Component({
  selector: 'app-column-settings',
  templateUrl: './column-settings.component.html',
  styleUrls: ['./column-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnSettingsComponent implements AfterViewInit {
  @ViewChildren('checkbox') checkboxes!: QueryList<MatCheckbox>;

  readonly TASK_STATUS_VALUES = TASK_STATUS_VALUES;

  inputColumns: string [] = [];
  outputColumns = new Set<string>([]);
  numTasksByColumn: {[key: string]: number} = {};

  constructor(@Inject(MAT_DIALOG_DATA) data: DialogData, private dialogRef: MatDialogRef<ColumnSettingsComponent>) {
    if (data && data.columns) {
      // console.log('cS ctor data.columns/all values: ', data.columns, TASK_STATUS_VALUES);
      this.inputColumns = [...data.columns];
    }

    if (data && data.numTasksByColumn) {
      // console.log('cS ctor data.numTasksByColumn: ', data.numTasksByColumn);
      this.numTasksByColumn = data.numTasksByColumn;
    }
  }

  ngAfterViewInit(): void {
    // console.log('cS ngAVI checkboxes: ', this.checkboxes);
    // for (const checkbox of this.checkboxes) {
    //   console.log('cS ngAVI checkbox: ', checkbox);
    //   console.log('cS ngAVI checkbox id/value: ', checkbox.id, checkbox.checked);
    // }
  }

  getCheckedStatus(column: string) {
    const checked = this.inputColumns.includes(column);
    return checked;
  }

  generateColumnsList(event: any) {
    // console.log('cS gCL checkbox event: ', event);

    this.outputColumns.clear();
    for (const checkbox of this.checkboxes) {
      // console.log('cS ngAVI checkbox: ', checkbox);
      // console.log('cS ngAVI checkbox id/value: ', checkbox.id, checkbox.checked);
      if (checkbox.checked) {
        this.outputColumns.add(checkbox.id)
      }

    }
    this.outputColumns.add('new-column');
    // console.log('cS gCL output columns: ', this.outputColumns);
  }

  handleSetAllColumns(checked: boolean) {
    this.outputColumns.clear();
    for (const checkbox of this.checkboxes) {
      checkbox.checked = checked;
      if (checked ) {
        this.outputColumns.add(checkbox.id);
      }
    }
    this.outputColumns.add('new-column');
  }
  
  handleSaveOperation() {
    // console.log('cS hSO save columns called.  output columns: ', this.outputColumns);
    this.dialogRef.close({'outcome': DialogCloseResult.COLUMN_SETTINGS_COMPLETE, 'columns': this.outputColumns});
  }
  
  handleCancelOperation() {
    // console.log('cS hSO cancel columns called');
    this.dialogRef.close({'outcome': DialogCloseResult.COLUMN_SETTINGS_CANCELLED});
  }
}
