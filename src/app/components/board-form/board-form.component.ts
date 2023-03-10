import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

import { BoardsStore } from 'src/app/services/boards-store.service';
import { Board, DialogCloseResult, DialogData, FormMode, Task, TaskStatus} from '../../common/interfaces';
import { BOARD_INITIALIZER } from 'src/app/common/constants';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardFormComponent implements OnInit {
  boardForm: FormGroup;
  displayNameControl = new FormControl('');
  descriptionControl = new FormControl('');
  // statusControl = new FormControl(TaskStatus.NOT_STARTED);

  statusValues = Object.values(TaskStatus);

  readonly FormMode = FormMode;
  formMode: FormMode = FormMode.CREATE;

  boardBS = new BehaviorSubject<Board>(BOARD_INITIALIZER);

  constructor(private boardsStore: BoardsStore,
    public dialogRef: MatDialogRef<BoardFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.buildBoardForm();
    // console.log('bF ctor dialog data: ', data);
    // console.log('bF ctor dialog ref: ', dialogRef);

    if (data && data.board) {
      this.formMode = FormMode.EDIT;
      // console.log('bF ctor board for edit board: ', data.board);
      this.boardBS.next(data.board);

      this.populateForm(this.boardBS.value);

    }
  }

  ngOnInit() {}

  buildBoardForm() {
    this.boardForm = new FormGroup({
      'displayNameControl': this.displayNameControl,
      'descriptionControl': this.descriptionControl,
    })
  }

  populateForm(board: Board) {
    this.boardForm.patchValue({
      'displayNameControl': board.displayName ?? '',
      'descriptionControl': board.description,
      
    })
  }

  handleSaveBoard() {
    const boardData = this.boardForm.value;
    // console.log('bF sB board form values: ', boardData);
    const board: Board = {
      id: this.boardBS.value.id ?? undefined ,
      displayName: boardData.displayNameControl,
      description: boardData.descriptionControl,
      // status: boardData.statusControl,
    }
    
    // console.log('bF sB board to BE: ', board);
    if (this.formMode === FormMode.EDIT) {
      board.tasks = this.boardBS.value.tasks,
      // this.boardsService.updateBoard(board);
      this.boardsStore.updateBoard(board);
      this.dialogRef.close({outcome: DialogCloseResult.EDIT_BOARD_COMPLETE});
    } else {
      // console.log('bF sB board object to create: ', board);
      // this.boardsService.createBoard(board);
      this.boardsStore.createBoard(board);
      this.dialogRef.close({outcome: DialogCloseResult.CREATE_BOARD_COMPLETE});
    }
   }

  handleCancelOperation() {
    this.boardForm.reset();
    
    if (this.formMode === FormMode.EDIT) {
      this.dialogRef.close({outcome: DialogCloseResult.EDIT_BOARD_CANCELLED});
    
    } else {
      this.dialogRef.close({outcome: DialogCloseResult.CREATE_BOARD_CANCELLED});
    }
   
  }

}
