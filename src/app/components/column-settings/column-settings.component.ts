import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, QueryList, ViewChildren } from '@angular/core';
import { MatCheckbox} from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import { TaskStatus, TASK_STATUS_VALUES, DialogData, DialogCloseResult, Column } from '../../common/interfaces';

@Component({
  selector: 'app-column-settings',
  templateUrl: './column-settings.component.html',
  styleUrls: ['./column-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnSettingsComponent implements AfterViewInit {
  @ViewChildren('checkbox') checkboxes!: QueryList<MatCheckbox>;

  readonly TASK_STATUS_VALUES = TASK_STATUS_VALUES;

  inputUserColumns: Column[] = [];
  allColumns: Column[] = [];
  inputColumnNames: string[] = [];
  outputColumns: Column[] = [];
  numTasksByColumn: {[key: string]: number} = {};

  constructor(@Inject(MAT_DIALOG_DATA) data: DialogData, private dialogRef: MatDialogRef<ColumnSettingsComponent>) {
    if (data && data.userColumns) {
      // console.log('cS ctor data.columns/all values: ', data.allColumns, TASK_STATUS_VALUES);
      this.inputUserColumns = [...data.userColumns];
      this.allColumns = [...data.allColumns];
      this.inputColumnNames = this.generateInputColumnNamesList();
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

  generateInputColumnNamesList(): string[] {
    const columnNames: string[] = [];
    for (const column of this.inputUserColumns) {
      columnNames.push(column.name);
    }

    return columnNames;
  }

  getCheckedStatus(columnName: string) {
    const checked = this.inputColumnNames.includes(columnName);
    return checked;
  }

  generateColumnsList(event: any) {
    // console.log('cS gCL checkbox event: ', event);

    this.outputColumns = [];
    for (const checkbox of this.checkboxes) {
      // console.log('cS gCL checkbox: ', checkbox);
      // console.log('cS gCL checkbox id/value: ', checkbox.id, checkbox.checked);
      if (checkbox.checked) {
        for (const col of this.allColumns) {
          if (col.name === checkbox.id) {
            this.outputColumns.push(col);

          }
        }
      }

    }
    
    // console.log('cS gCL output columns: ', this.outputColumns);
  }

  handleSelectColumnsWithTasks() {
    this.outputColumns = [];
    // console.log('cS gCL numtasks by col: ', this.numTasksByColumn);
    for (const checkbox of this.checkboxes) {
      checkbox.checked = false;
      if (this.numTasksByColumn[checkbox.id] && this.numTasksByColumn[checkbox.id] > 0) {
        // console.log('cS gCL numtasks by col id: ',checkbox.id, this.numTasksByColumn[checkbox.id]);
        checkbox.checked = true;
        const column = this.allColumns.find(col => col.name === checkbox.id);
        // console.log('cS gCL checked column: ', column?.name);
        if (column) {
          // console.log('cS gCL pushing to output columns');
          this.outputColumns.push(column);
        }
      }
    }
    // console.log('cS gCL output columns: ', this.outputColumns);
  }

  handleSetAllColumns(checked: boolean) {
    this.outputColumns = [];
    for (const checkbox of this.checkboxes) {
      checkbox.checked = checked;
      if (checked) {
        this.outputColumns = this.allColumns;
      }
    }
    
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
