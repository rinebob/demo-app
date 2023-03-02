import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { BOARD_INITIALIZER } from 'src/app/common/constants';
import { Board, Task } from 'src/app/common/interfaces';
import { BoardsService } from 'src/app/services/boards.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { BoardFormComponent } from '../board-form/board-form.component';

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardViewComponent implements OnInit {

  boardBS = new BehaviorSubject<Board>(BOARD_INITIALIZER);
  board$: Observable<Board> = this.boardBS;

  tasksBS = new BehaviorSubject<Task[]>([]);
  tasks$: Observable<Task[]> = this.tasksBS;

  selectedTaskBS = new BehaviorSubject<Task|undefined>(undefined);
  selectedTask$: Observable<Task|undefined> = this.selectedTaskBS;

  constructor(private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog, private boardsService: BoardsService,
    ) {

      this.route.data.pipe().subscribe(data => {
        // console.log('bV ctor route data: ', data);
        if (data && data['board'] && data['board'].displayName !== '') {
          this.initializeBoardAndTasks(data['board']);
        }
      });

      this.board$.pipe().subscribe(board => {
        // console.log('bV ctor board sub: ', board);
      });
  }

  ngOnInit(): void {
  }

  initializeBoardAndTasks(board: Board) {
    console.log('bV iBAT selected board from route: ', board);
    this.boardBS.next(board);
    const tasks = this.boardBS.value.tasks;
    if (tasks) {
      this.tasksBS.next(tasks);
      console.log('bV iBAT tasks from board: ', tasks);
    }
  }

  openEditBoardDialog() {

    const dialogData = {
      board: this.boardBS.value,
    }

    console.log('aC oEBD edit board called. board: ', this.boardBS.value);

    const dialogRef = this.dialog.open(BoardFormComponent, {data: dialogData});

    dialogRef.afterClosed().subscribe(result => {
      console.log('bV oEBD edit board dialog closed.  result: ', result);
      this.boardsService.getBoard(this.boardBS.value.id ?? -1).pipe().subscribe(board => {
        console.log('bV oEBD board from be after edit: ', board);
        this.boardBS.next(board);
      });
    });

  }

  openCreateTaskDialog() {
    const dialogData = {
      boardId: this.boardBS.value.id,
    }

    // console.log('aC oCTD create task called. boardId: ', this.boar);

    const dialogRef = this.dialog.open(TaskFormComponent, {data: dialogData});

    dialogRef.afterClosed().subscribe(result => {
      console.log('bV oCTD create task dialog closed.  result: ', result);
    });

  }
}
