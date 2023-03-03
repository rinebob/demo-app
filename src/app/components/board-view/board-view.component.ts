import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BOARD_INITIALIZER } from 'src/app/common/constants';
import { Board, Task } from 'src/app/common/interfaces';
import { BoardsService } from 'src/app/services/boards.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { BoardFormComponent } from '../board-form/board-form.component';
import { ThemePalette } from '@angular/material/core';
import { BOARDS } from 'src/app/testing/mock-task-data';

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardViewComponent implements OnInit {

  boardsBS = new BehaviorSubject<Board[]>([])
  boards$: Observable<Board[]> = this.boardsBS;

  selectedBoardBS = new BehaviorSubject<Board>(BOARD_INITIALIZER);
  selectedBoard$: Observable<Board> = this.selectedBoardBS;
  
  tasksBS = new BehaviorSubject<Task[]>([]);
  tasks$: Observable<Task[]> = this.tasksBS;

  selectedTaskBS = new BehaviorSubject<Task|undefined>(undefined);
  selectedTask$: Observable<Task|undefined> = this.selectedTaskBS;

  showAllBoards = true;
  showTasks = false;
  showForm = false;
  numBoards = 0;

  shouldShowOpenDrawerButton = true;
  darkModeToggleButtonColor: ThemePalette = 'primary';

  constructor(private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog, private boardsService: BoardsService,
    ) {

      this.boardsService.listBoards();
      
      boardsService.boards$.pipe().subscribe(boards => {
        if (boards.length > 0) {
          // console.log('bV ctor boards sub: ', boards);
          this.numBoards = boards.length;
          this.boardsBS.next(boards);

        }
      });

      boardsService.selectedBoard$.pipe().subscribe(board => {
        if (board) {
          // console.log('bV ctor selected board sub: ', board);
          // this.initializeBoardAndTasks(board);
          this.selectedBoardBS.next(board);

        }
      });

      this.boards$.pipe().subscribe(boards => {
        // console.log('bV ctor boards sub: ', boards);
      });

      this.selectedBoard$.pipe().subscribe(board => {
        // console.log('bV ctor selected board sub: ', board);
        if (board && board.displayName !== '') {
          this.initializeBoardAndTasks(board);
        }
        if (this.boardsBS.value && board.displayName === '') {
          this.boardsService.setSelectedBoard(1);
        }
      });

      this.tasks$.pipe().subscribe(tasks => {
        // console.log('bV ctor tasks sub: ', tasks);
      });
  }

  ngOnInit(): void {
  }

  initializeBoardAndTasks(board: Board) {
    // console.log('bV iBAT initializing board: ', board);
    const tasks = board.tasks;
    if (tasks) {
      this.tasksBS.next(tasks);
      // console.log('bV iBAT tasks from board: ', tasks);
    } else {
      // console.log('bV iBAT board doesnt have tasks yet');
      this.tasksBS.next([]);
    }
  }
  
  setSelectedBoard(board: Board) {
    // console.log('bV sSB board: ', board);
    this.selectedBoardBS.next(board);
    this.initializeBoardAndTasks(this.selectedBoardBS.value);
  }

  openCreateBoardDialog() {

    // console.log('aC oCBD create board called');

    const dialogRef = this.dialog.open(BoardFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log('aC oCTD create board dialog closed.  result: ', result);
    });

  }

  openEditBoardDialog() {

    const dialogData = {
      board: this.selectedBoardBS.value,
    }

    // console.log('aC oEBD edit board called. board: ', this.selectedBoardBS.value);

    const dialogRef = this.dialog.open(BoardFormComponent, {data: dialogData});

    dialogRef.afterClosed().subscribe(result => {
      // console.log('bV oEBD edit board dialog closed.  result: ', result);
      this.boardsService.getBoard(this.selectedBoardBS.value?.id ?? -1).pipe().subscribe(board => {
        // console.log('bV oEBD board from be after edit: ', board);
        // this.selectedBoardBS.next(board);
        this.setSelectedBoard(board);
      });
    });

  }

  openCreateTaskDialog() {
    const dialogData = {
      boardId: this.selectedBoardBS.value?.id,
    }

    // console.log('aC oCTD create task called. boardId: ', this.boar);

    const dialogRef = this.dialog.open(TaskFormComponent, {data: dialogData});

    dialogRef.afterClosed().subscribe(result => {
      // console.log('bV oCTD create task dialog closed.  result: ', result);
    });

  }

  toggleDarkMode(event: any) {
    // console.log('a tDM event: ', event);
  }

  toggleShowDrawerButton(event: any) {
    // console.log('a tSSB event: ', event);
    this.shouldShowOpenDrawerButton = !this.shouldShowOpenDrawerButton;

  }
}
