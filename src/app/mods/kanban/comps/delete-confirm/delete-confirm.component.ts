import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import { BoardsStore } from 'src/app/services/boards-store.service';
import { DialogCloseResult, DialogData } from '../../../../common/interfaces';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteConfirmComponent implements OnInit {

  displayName = '';
  deleteMessage = '';
  
  constructor(public dialogRef: MatDialogRef<DeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private boardsStore: BoardsStore,
    ) {

      // console.log('dC ctor dialog data: ', data);

      this.setMessages();
  }

  ngOnInit() {
    // console.log('dC ngOI delete data: ', this.data);
    // this.deleteEntity(this.data);
  }

  setMessages() {
    const data = this.data;
    // console.log('dC dE data: ', data);
    if (data.board && data.board.id) {
      this.displayName = data.board.displayName;
      this.deleteMessage = 'board';
      // console.log('dC dE type = board: ', data.board);
      
    } else if (data.task && data.task.id) {
      this.displayName = data.task.displayName;
      this.deleteMessage = 'task and its subtasks';
      // console.log('dC dE type = task: ', data.task);
    } else {
      // console.log('dC dE no entity present');
    }

  }

  handleCancel() {
    this.dialogRef.close({outcome: DialogCloseResult.DELETE_BOARD_CANCELLED});
  }

  handleDelete() {
    this.deleteEntity();
  }
  
  deleteEntity() {
    const data = this.data;
    // console.log('dC dE data: ', data);
    
    if (data.board && data.board.id) {
      // console.log('dC dE type = board: ', data.board);

      this.boardsStore.deleteBoard(data.board.id);
      
      this.dialogRef.close({outcome: DialogCloseResult.DELETE_BOARD_COMPLETE});
      
    } else if (data.task && data.task.id && data.task.boardId) {
      // console.log('dC dE deleting task: ', data.task);
      this.boardsStore.deleteTask(data.task);
      this.dialogRef.close({outcome: DialogCloseResult.DELETE_TASK_COMPLETE});
      
    } else {
      // console.log('dC dE no entity present');
      
    }

  }

}
