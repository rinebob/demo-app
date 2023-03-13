import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, QueryList, ViewChildren } from '@angular/core';
import { MatCheckbox} from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { COLUMN_ORDER_FROM_STATUS } from '../../common/constants';
import { TaskStatus, TASK_STATUS_VALUES, DialogData, DialogCloseResult, Column, Task } from '../../common/interfaces';
import { updateColumnOrders } from '../../common/task_utils';

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
  columnOrder: {[key: string]: number} = {};

  constructor(@Inject(MAT_DIALOG_DATA) data: DialogData,
              private dialogRef: MatDialogRef<ColumnSettingsComponent>
              ) {

    if (data && data.userColumns) {
      // console.log('cS ctor data.columns/user columns: ', data.allColumns, data.userColumns);
      this.inputUserColumns = data.userColumns;
      this.allColumns = data.allColumns ?? [];
      this.inputColumnNames = this.generateInputColumnNamesList();
      let i = 1;
      for (const col of this.allColumns) {
        this.columnOrder[col.name] = i;
        i++;
      }
      // console.log('cs ctor init column orders: ', this.columnOrder);
    }

    if (data && data.numTasksByColumn) {
      // console.log('cS ctor data.numTasksByColumn: ', data.numTasksByColumn);
      this.numTasksByColumn = data.numTasksByColumn;
    }
  }

  ngAfterViewInit(): void {}

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

    for (const checkbox of this.checkboxes) {
      // console.log('cS gCL checkbox: ', checkbox);
      // console.log('cS gCL checkbox id/value: ', checkbox.id, checkbox.checked);
      const column = this.allColumns.find(col => col.name === checkbox.id);
      if (column) {
        if (checkbox.checked) {
            column.display = true;
          } else {
            column.display = false;
          }
          // console.log('cS gCL all columns after check: ', this.allColumns);
      }
    }
    // console.log('cS gCL output all columns: ', this.allColumns);
  }

  handleSelectColumnsWithTasks() {
    // console.log('cS gCL input all columns: ', this.allColumns);
    // console.log('cS gCL numtasks by col: ', this.numTasksByColumn);
    for (const col of this.allColumns) {
      if (col.name !== 'new column') {
        col.display = false;
      }
    }
    for (const checkbox of this.checkboxes) {
      checkbox.checked = false;
      if (this.numTasksByColumn[checkbox.id] && this.numTasksByColumn[checkbox.id] > 0) {
        // console.log('cS gCL numtasks by col id: ',checkbox.id, this.numTasksByColumn[checkbox.id]);
        checkbox.checked = true;
        const column = this.allColumns.find(col => col.name === checkbox.id);
        // console.log('cS gCL checked column: ', column?.name);
        if (column) {
          // console.log('cS gCL pushing to output columns');
          // this.outputColumns.push(column);
          column.display = true;
        }
      }
    }
    // console.log('cS gCL output all columns: ', this.allColumns);
  }

  handleResetInitial() {
    const newCheckboxes = [];
    for (const [key, value] of Object.entries(COLUMN_ORDER_FROM_STATUS)) {

      const column = this.allColumns.find(col => col.name === key);
      if (column) {
        column.order = value;
        const checkbox = this.checkboxes.find(box => box.id === key);
        newCheckboxes.push(checkbox)
      }
    }

    for (const box of this.checkboxes) {
      // console.log('cs hRI checkbox name: ', box.id);
      newCheckboxes.push(box);
    }
  }

  handleSetAllColumns(checked: boolean) {
    // console.log('cS hSAC set all columns pre: ', this.allColumns);
    for (const checkbox of this.checkboxes) {
      checkbox.checked = checked ? true : false;
    }
    for (const col of this.allColumns) {
      col.display = checked ? true : false;
    }
    // console.log('cS hSAC set all columns post: ', this.allColumns);
    
  }

  dropElement(event: CdkDragDrop<TaskStatus[]>) {
    // console.log('cS dE drop element event: ', event);
    // console.log('cS dE prevind/ind/prevCont/cont ', event.previousIndex, event.currentIndex, event.previousContainer.id, event.container.id);
    
    if (event.previousContainer === event.container) {
      // console.log('cS dE move in array');
      
      // check the moved item before updating the order
      const movedColumn = this.allColumns.find(col => col.order === event.previousIndex);
      const movedBox = this.checkboxes.find(box => box.id === movedColumn?.name);
      // console.log('---------------------');
      // console.log('cS dE moved col/box:', {...movedColumn}, movedBox?.id);
      if (movedBox) {
        // console.log('cS dE checking moved box. pre: ', movedBox.id, movedBox.checked);
        movedBox.checked = true;
        // console.log('cS dE checking moved box. post: ', movedBox.id, movedBox.checked);
      }


      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      
      const newColumnOrders = this.updateColumnOrder(event);
      this.allColumns = [...newColumnOrders];
      // console.log('cS dE newColumnOrders:', newColumnOrders);

      this.outputColumns = [];
      for (const box of this.checkboxes) {
        // console.log('cS dE checkbox/checked:', box.id, box.checked);
        const column = this.allColumns.find(col => col.name === box.id);
        // console.log('cS dE column:', column);
        if (column) {
          if (box.checked) {
            column.display = true;
          } else {
            column.display = false;
          }
        }
      }
      // console.log('cS dE output all columns after move:', this.allColumns);
    }
  }

  updateColumnOrder(event: CdkDragDrop<TaskStatus[]>): Column[] {
    const newColumns = updateColumnOrders(this.allColumns, event.previousIndex, event.currentIndex);
    // console.log('cS uCO updated colums: ', newColumns);
    
    return newColumns;
  }
  
  handleSaveOperation() {
    // console.log('cS hSO save columns called.  output all columns: ', this.allColumns);
    this.dialogRef.close({
      'outcome': DialogCloseResult.COLUMN_SETTINGS_COMPLETE,
      'columns': this.allColumns,
    });
  }
  
  handleCancelOperation() {
    // console.log('cS hSO cancel columns called');
    this.dialogRef.close({'outcome': DialogCloseResult.COLUMN_SETTINGS_CANCELLED});
  }
}
