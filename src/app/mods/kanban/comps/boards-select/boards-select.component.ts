import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import { OverlayContainer } from '@angular/cdk/overlay';

import { DialogCloseResult, DialogData } from 'src/app/common/interfaces';
import { BoardFormComponent } from '../board-form/board-form.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-boards-select',
  templateUrl: './boards-select.component.html',
  styleUrls: ['./boards-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardsSelectComponent {
  
  boards: string[] = [];
  selectedBoard: string;
  get numBoards() {
    return this.boards.length;
  } 

  showSampleBoardButtonBS = new BehaviorSubject<boolean>(false);
  showSampleBoardButton$: Observable<boolean> = this.showSampleBoardButtonBS;
  
  darkModeToggleButtonColor: ThemePalette = 'primary';
  theme = '';
  
  constructor(public dialogRef: MatDialogRef<BoardFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _overlayContainer: OverlayContainer,
    ) {
      // console.log('bS ctor boards dialog data: ', data);
      
      if (data && data.boardNames) {
        this.boards = data.boardNames;
      }
      
      if (data && data.selectedBoard) {
        this.selectedBoard = data.selectedBoard;
      }

      if (data && data.showSampleBoardButton) {
        this.showSampleBoardButtonBS.next(data.showSampleBoardButton);
      }
      
      if (data && data.theme) {
        this.theme = data.theme;
        // console.log('bS ctor theme: ', this.theme);
        this.applyTheme(this.theme);
      }
      
    }

    applyTheme(theme: string): void {
      // remove old theme class and add new theme class
      const overlayContainerClasses = this._overlayContainer.getContainerElement().classList;
      // console.log('bV aT container classes pre: ', overlayContainerClasses);
      const themeClassesToRemove = Array.from(overlayContainerClasses)
      .filter((item: string) => item.includes('kanban-'));
      if (themeClassesToRemove.length) {
        overlayContainerClasses.remove(...themeClassesToRemove);
      }
      // console.log('bV aT adding theme: ', theme);
      overlayContainerClasses.add(theme);
      // console.log('bV aT container classes post: ', overlayContainerClasses);
    }
    
    getFocusStatus(appName: string) {
    // console.log('bS gFS selected board/menu item/match: ', this.selectedBoard, appName, this.selectedBoard === appName);
    return this.selectedBoard === appName;
  }

  handleSetSelectedBoard(boardName: string) {
    this.dialogRef.close({outcome: DialogCloseResult.SET_SELECTED_BOARD, selectedBoard: boardName});
  }

  handleOpenCreateBoardDialog() {
    this.dialogRef.close({outcome: DialogCloseResult.OPEN_CREATE_BOARD_DIALOG});
  }

  handleAddSampleBoard() {
    this.dialogRef.close({outcome: DialogCloseResult.ADD_SAMPLE_BOARD});
  }
  
  handleUpdateToggleDarkMode() {
    this.dialogRef.close({outcome: DialogCloseResult.TOGGLE_DARK_MODE});
    
  }

}
