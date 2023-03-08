import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, of, withLatestFrom } from 'rxjs';
import { BOARD_INITIALIZER } from 'src/app/common/constants';
import { Board, Column, Task } from 'src/app/common/interfaces';
import { TaskFormComponent } from '../task-form/task-form.component';
import { BoardFormComponent } from '../board-form/board-form.component';
import { ThemePalette } from '@angular/material/core';
import { BoardsStore } from 'src/app/services/boards-store.service';
import { ColumnSettingsComponent } from '../column-settings/column-settings.component';

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

  constructor(private dialog: MatDialog, private boardsStore: BoardsStore) {

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

    const dialogRef = this.dialog.open(BoardFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log('bV oCTD create board dialog closed.  result: ', result);
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
    });

  }

  openCreateTaskDialog() {
    let id = 0;
    this.selectedBoard$.pipe().subscribe(board => id = board.id ?? -1);
    const dialogData = {
      boardId: id,
    }

    // console.log('aC oCTD create task called. boardId: ', id);

    const dialogRef = this.dialog.open(TaskFormComponent, {data: dialogData});

    dialogRef.afterClosed().subscribe(result => {
      // console.log('bV oCTD create task dialog closed.  result: ', result);
    });

  }

  openConfigureColumnsDialog() {
    const dialogData = {
      allColumns: this.allColumns,
      userColumns: this.userSelectedColumns,
      numTasksByColumn: this.numTasksByColumn,
    }

    const dialogRef = this.dialog.open(ColumnSettingsComponent, {data: dialogData});

    dialogRef.afterClosed().subscribe(result => {
      // console.log('bV oCCD column settings dialog closed.  result: ', result);
      // console.log('bV oCCD updated columns: ', result['columns']);
      
      if (result && result.columns) {
        this.boardsStore.setAllColumns(result['columns']);
        
        let cols: Column[] = [];
        for (const col of result['columns']) {
          if (col.display) {
            cols.push(col);
          }
        }
        
        // console.log('bV oCCD updated user selected columns: ', cols);
        this.boardsStore.setUserSelectedColumns(cols);


      }
    });
    
  }
  
  handleUpdatedTasks(tasks: Task[]) {
    // console.log('bV hUT handle updated tasks: ', tasks);
    const board = this.selectedBoardBS.value;
    board.tasks = [...tasks];

    this.boardsStore.updateBoard(board);

  }
  

  toggleDarkMode(event: any) {
    // console.log('a tDM event: ', event);
  }

  toggleShowDrawerButton(event: any) {
    // console.log('a tSSB event: ', event);
    this.shouldShowOpenDrawerButton = !this.shouldShowOpenDrawerButton;

  }
}
