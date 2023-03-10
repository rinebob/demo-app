import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import { DialogCloseResult, DialogData } from 'src/app/common/interfaces';
import { BoardFormComponent } from '../board-form/board-form.component';

@Component({
  selector: 'app-boards-select',
  templateUrl: './boards-select.component.html',
  styleUrls: ['./boards-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardsSelectComponent {
  
  boards: string[] = [];
  get numBoards() {
    return this.boards.length;
  } 

  darkModeToggleButtonColor: ThemePalette = 'primary';
  
  constructor(public dialogRef: MatDialogRef<BoardFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      console.log('bS ctor boards dialog data: ', data);

      if (data && data.boardNames) {
        this.boards = data.boardNames;
      }

  }

  handleSetSelectedBoard(boardName: string) {
    this.dialogRef.close({outcome: DialogCloseResult.SET_SELECTED_BOARD, selectedBoard: boardName});
  }

  handleOpenCreateBoardDialog() {
    this.dialogRef.close({outcome: DialogCloseResult.OPEN_CREATE_BOARD_DIALOG});
  }
  
  handleUpdateToggleDarkMode() {
    this.dialogRef.close({outcome: DialogCloseResult.TOGGLE_DARK_MODE});
    
  }

}
