import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { BoardsStore } from 'src/app/services/boards-store.service';
import { Board, DialogCloseResult, DialogData, FormMode, TaskStatus} from '../../../../common/interfaces';
import { BOARD_INITIALIZER } from 'src/app/common/constants';
import { UserService } from 'src/app/services/user.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardFormComponent implements OnDestroy, OnInit {
  readonly destroy$ = new Subject<void>();

  user$ = this.userService.user$;
  ownerUidBS = new BehaviorSubject<string>('');

  boardForm: FormGroup;
  displayNameControl = new FormControl('');
  descriptionControl = new FormControl('');
  // statusControl = new FormControl(TaskStatus.NOT_STARTED);

  statusValues = Object.values(TaskStatus);

  readonly FormMode = FormMode;
  formMode: FormMode = FormMode.CREATE;

  boardBS = new BehaviorSubject<Board>(BOARD_INITIALIZER);

  constructor(private boardsStore: BoardsStore,
              readonly userService: UserService, 
              public dialogRef: MatDialogRef<BoardFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {

    // super();

    // this.theme = data.theme ? data.theme : 'kanban-light-theme';

    // console.log('bF ctor theme from dialog shell/dialog data: ', this.theme, data.theme);

    this.buildBoardForm();
    // console.log('bF ctor dialog data: ', data);
    // console.log('bF ctor dialog ref: ', dialogRef);

    if (data && data.board) {
      this.formMode = FormMode.EDIT;
      // console.log('bF ctor board for edit board: ', data.board);
      this.boardBS.next(data.board);

      this.populateForm(this.boardBS.value);

    }

    this.user$.pipe(takeUntil(this.destroy$)).subscribe((user: User | null) => {
      if (user) {
        this.ownerUidBS.next(user?.uid);
        // console.log('bF ctor user id/value: ',user.uid, user);
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

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
      ownerUid: this.ownerUidBS.value,
    }

    // console.log('bF sB board to BE: ', board);
    if (this.formMode === FormMode.EDIT) {
      this.boardsStore.updateBoard(board);
      this.dialogRef.close({outcome: DialogCloseResult.EDIT_BOARD_COMPLETE});
    } else {
      // console.log('bF sB board object to create: ', board);
      delete board.id;
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
