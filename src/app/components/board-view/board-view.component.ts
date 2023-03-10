import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject, Observable, of, withLatestFrom } from 'rxjs';

import { BOARD_INITIALIZER } from 'src/app/common/constants';
import { Board, Column, DialogCloseResult, DialogResult, Task } from 'src/app/common/interfaces';
import { ThemePalette } from '@angular/material/core';
import { BoardsStore } from 'src/app/services/boards-store.service';
import { DialogService } from 'src/app/services/dialog-service.service';

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardViewComponent implements OnInit {
  
  boards$ = this.boardsStore.boards$;
  selectedBoard$ = this.boardsStore.selectedBoard$;
  allTasksByStatus$ = this.boardsStore.allTasksByStatus$;
  allColumns$ = this.boardsStore.allColumns$;
  allColumnsWithTasks$ = this.boardsStore.allColumnsWithTasks$;
  userSelectedColumns$ = this.boardsStore.userSelectedColumns$;
  numberOfTasksPerColumn$ = this.boardsStore.numberOfTasksPerColumn$;

  boardsBS = new BehaviorSubject<Board[]>([])
  selectedBoardBS = new BehaviorSubject<Board>(BOARD_INITIALIZER);
  
  tasksBS = new BehaviorSubject<Task[]>([]);
  tasks$: Observable<Task[]> = this.tasksBS;

  selectedTaskBS = new BehaviorSubject<Task|undefined>(undefined);
  selectedTask$: Observable<Task|undefined> = this.selectedTaskBS;

  showAllBoards = true;
  showTasks = false;
  showForm = false;
  numBoards = 0;

  allColumns: Column[] = [];
  userSelectedColumns: Column[] = [];
  numTasksByColumn: {[key: string]: number};

  shouldShowOpenDrawerButton = true;
  darkModeToggleButtonColor: ThemePalette = 'primary';
  darkModeOn = true;

  // using the same css as the ViewTask component menu 
  topnavMenuCssClass = 'view-task-menu-css';

  constructor(private dialog: MatDialog, private boardsStore: BoardsStore,
      private dialogService: DialogService,
    ) {

      // console.log('-------------------------------');
      // console.log('bV ctor board view ctor');

      this.boardsStore.getAllBoards();

      this.boards$.pipe(
        withLatestFrom(this.selectedBoard$)
      ).subscribe(([boards, board]) => {
        // console.log('bV ctor store boards sub: ', boards);
        this.numBoards = boards.length;
        this.boardsBS.next([...boards]);
        if (boards[0] && board && board.displayName === '') {
          this.boardsStore.setSelectedBoard(boards[0]);
          // console.log('bV ctor setting default selectedBoard: ', boards[0]);
        } else {
          this.boardsStore.setSelectedBoard(boards.find(b => b.id === board.id) ?? boards[0]);
        }
      });

      this.selectedBoard$.pipe().subscribe(board => {
        // console.log('bV ctor store selected board sub: ', board);
        if (board && board.displayName !== '') {
          this.selectedBoardBS.next(board);
          this.initializeBoardAndTasks(board);
        }
      });

      this.allColumns$.pipe().subscribe(columns => {
        // console.log('bV ctor all columns sub: ', columns);
        this.allColumns = columns;
      });

      this.userSelectedColumns$.pipe().subscribe(columns => {
        // console.log('bV ctor user selected columns sub: ', columns);
        this.userSelectedColumns = columns;
      });
  
      this.numberOfTasksPerColumn$.pipe().subscribe(numbers => {
        // console.log('bV ctor num tasks by column sub: ', numbers);
        this.numTasksByColumn = numbers;
      });

      this.boards$.pipe().subscribe((boards) => {
        // console.log('bV ctor boards store sub: ', boards);
      });

      this.selectedBoard$.pipe().subscribe(board => {
        // console.log('bV ctor boards store selected board sub: ', board);
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
    this.boardsStore.setSelectedBoard(board);
  }

  openCreateBoardDialog() {
    // console.log('aC oCBD create board called');
    this.dialogService.openCreateBoardDialog();
  }

  openEditBoardDialog() {
    this.dialogService.openEditBoardDialog(this.selectedBoardBS.value);
  }

  openCreateTaskDialog() {
    const id = this.selectedBoardBS.value.id;
    if (id) {
      this.dialogService.openCreateTaskDialog(id);
      // console.log('bV oCTD create task called. boardId: ', id);
      
    } else {
      // console.log('bV oCTD create task called but theres no board id dude!  wtf???');
    }
  }

  openConfigureColumnsDialog() {
    const dialogData = {
      allColumns: [...this.allColumns],
      userColumns: [...this.userSelectedColumns],
      numTasksByColumn: {...this.numTasksByColumn},
    }

    this.dialogService.openConfigureColumnsDialog(dialogData);
  }

  openBoardsSelectDialog() {
    console.log('bV oBSD open boards select dialog called');
    
    const boardNames: string[] = [];
    for (const board of this.boardsBS.value) {
      boardNames.push(board.displayName);
    }

    const data = {
      darkModeOn: this.darkModeOn,
      boardNames,
    }

    const dialogRef = this.dialogService.openBoardsSelectDialog(data);

    dialogRef.afterClosed().subscribe(result => {
      this.handleBoardsSelectDialogCloseResult(result);
    });
  }
  
  handleBoardsSelectDialogCloseResult(result: DialogResult) {
    // console.log('bV oBSD boards select dialog closed.  result: ', result);
    if (result && result['outcome'] !== undefined) {
      // console.log('bV oBSD result outcome: ', result['outcome']);
      if (result['outcome'] === DialogCloseResult.SET_SELECTED_BOARD && result['selectedBoard']) {
        const board = this.boardsBS.value.find(b => b.displayName === result['selectedBoard']);
        if (board) {
          // console.log('bV oBSD result selected board: ', result['selectedBoard']);
          this.boardsStore.setSelectedBoard(board);
          // console.log('bV oBSD selected board: ', board);
        } else {
          // console.log('bV oBSD selected board not found');
        }
      }

      if (result['outcome'] === DialogCloseResult.OPEN_CREATE_BOARD_DIALOG) {
        // console.log('bV oBSD result = open create board dialog');
        this.openCreateBoardDialog();
        
      }
      
      if (result['outcome'] === DialogCloseResult.TOGGLE_DARK_MODE) {
        // console.log('bV oBSD result = toggle dark mode');
          this.toggleDarkMode();
      }
    } else {
      // console.log('bV oBSD no board select result dude!  wtf???');
    }
  }
  
  handleUpdatedTasks(tasks: Task[]) {
    // console.log('bV hUT handle updated tasks: ', tasks);
    const board = this.selectedBoardBS.value;
    board.tasks = [...tasks];

    this.boardsStore.updateBoard(board);
  }

  toggleDarkMode() {
    // console.log('bV tDM toggleDarkMode called.  pre: ', this.darkModeOn);
    this.darkModeOn = !this.darkModeOn;
    // console.log('bV tDM toggleDarkMode called.  post: ', this.darkModeOn);
  }

  toggleShowDrawerButton(event: any) {
    // console.log('bV tSSB event: ', event);
    this.shouldShowOpenDrawerButton = !this.shouldShowOpenDrawerButton;
  }
}
