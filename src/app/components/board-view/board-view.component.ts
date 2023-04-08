import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BehaviorSubject, Observable, withLatestFrom } from 'rxjs';

import { BOARD_INITIALIZER, GUIDED_TOUR_TEXT } from 'src/app/common/constants';
import { Board, Column, DialogCloseResult, DialogResult, GuidedTourMetadata, Task, TourStop } from 'src/app/common/interfaces';
import { ThemePalette } from '@angular/material/core';
import { BoardsStore } from 'src/app/services/boards-store.service';
import { DialogService } from 'src/app/services/dialog-service.service';

import { FbProjectsService } from 'src/app/services/fb-projects.service';

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardViewComponent implements OnInit {
  @HostBinding('class') theme = 'kanban-light-theme';
  
  boards$ = this.boardsStore.boards$;
  selectedBoard$ = this.boardsStore.selectedBoard$;
  tasks$ = this.boardsStore.tasks$;

  boardsBS = new BehaviorSubject<Board[]>([])
  selectedBoardBS = new BehaviorSubject<Board>(BOARD_INITIALIZER);
  tasksBS = new BehaviorSubject<Task[]>([]);

  allTasksByStatus$ = this.boardsStore.allTasksByStatus$;
  allColumns$ = this.boardsStore.allColumns$;
  allColumnsWithTasks$ = this.boardsStore.allColumnsWithTasks$;
  userSelectedColumns$ = this.boardsStore.userSelectedColumns$;
  numberOfTasksPerColumn$ = this.boardsStore.numberOfTasksPerColumn$;
  
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
  darkModeOnBS = new BehaviorSubject(false);
  darkModeOn$: Observable<boolean> = this.darkModeOnBS;

  topnavMenuCssClass = 'board-view-topnav-menu-css';
  boardsSelectPanelClass = 'boards-select-panel-class';

  readonly GUIDED_TOUR_TEXT = GUIDED_TOUR_TEXT;
  readonly TourStop = TourStop;
  selectedBubbleBS = new BehaviorSubject<GuidedTourMetadata|undefined>(undefined);
  selectedBubble$: Observable<GuidedTourMetadata|undefined> = this.selectedBubbleBS;
  
  constructor(private boardsStore: BoardsStore, private dialogService: DialogService,
    private _overlayContainer: OverlayContainer, private projectsService: FbProjectsService,
    ) {

      // console.log('-------------------------------');
   
      this.applyTheme(this.theme);

      this.boardsStore.getAllBoards();

      this.boards$.pipe(
        withLatestFrom(this.selectedBoard$)
      ).subscribe(([boards, selectedBoard]) => {

        if (boards.length > 0) {
          // console.log('bV ctor store boards sub: ', boards);
          this.numBoards = boards.length;
          this.boardsBS.next([...boards]);
          if (boards[0] && selectedBoard && selectedBoard.displayName === '') {
            this.setSelectedBoard(boards[0]);
            // console.log('bV ctor setting default selectedBoard: ', boards[0]);
          } else {
            const existingBoard = boards.find(b => b.id === selectedBoard.id) ?? boards[0];
            this.setSelectedBoard(existingBoard);
            // console.log('bV ctor setting existing selectedBoard: ', existingBoard);
          }
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

      // this.boards$.pipe().subscribe((boards) => {
      //   console.log('bV ctor boards store sub: ', boards);
      // });

      // this.selectedBoard$.pipe().subscribe(board => {
      //   console.log('bV ctor boards store selected board sub: ', board);
      // });

      this.tasks$.pipe().subscribe(tasks => {
        // console.log('bV ctor tasks sub: ', tasks);
        if (tasks && tasks.length > 0) {
          this.tasksBS.next(tasks);

        }
      });
  }

  ngOnInit(): void {
  }

  uploadData() {
    // console.log('bV uD upload data called');
    this.projectsService.uploadData();
  }
  
  initializeBoardAndTasks(board: Board) {
    // console.log('bV iBAT initializing board: ', board);
    if (board && board.id) {
      this.boardsStore.getTasksForBoard(board.id);
    }
  }
  
  setSelectedBoard(board: Board) {
    // console.log('bV sSB board: ', board);
    this.boardsStore.setSelectedBoard(board);
  }

  openCreateBoardDialog() {
    // console.log('aC oCBD create board called');
    this.dialogService.openCreateBoardDialog(this.theme);
  }

  handleTopnavMenuOpen() {
    this.applyTheme(this.theme);
  }

  openEditBoardDialog() {
    this.dialogService.openEditBoardDialog(this.selectedBoardBS.value, this.theme);
  }
  
  openDeleteBoardDialog() {
    this.dialogService.openDeleteBoardDialog(this.selectedBoardBS.value, this.theme);
  }

  openCreateTaskDialog() {
    const id = this.selectedBoardBS.value.id;
    if (id) {
      this.dialogService.openCreateTaskDialog(id, this.theme);
      // console.log('bV oCTD create task called. boardId: ', id);
      
    }
  }

  openConfigureColumnsDialog() {
    const dialogData = {
      allColumns: [...this.allColumns],
      userColumns: [...this.userSelectedColumns],
      numTasksByColumn: {...this.numTasksByColumn},
    }

    this.dialogService.openConfigureColumnsDialog(dialogData, this.theme);
  }

  openBoardsSelectDialog() {
    console.log('bV oBSD open boards select dialog called');
    
    const boardNames: string[] = [];
    for (const board of this.boardsBS.value) {
      boardNames.push(board.displayName);
    }

    const dialogData = {
      darkModeOn: this.darkModeOnBS.value,
      boardNames,
      selectedBoard: this.selectedBoardBS.value.displayName,
      theme: this.theme,
    }

    const dialogRef = this.dialogService.openBoardsSelectDialog(dialogData, this.theme);

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
          this.toggleTheme();
      }
    } else {
      // console.log('bV oBSD no board select result dude!  wtf???');
    }
  }
  
  startGuidedTour() {
    // console.log('bV oGTD open guided tour called');
    this.selectedBubbleBS.next(GUIDED_TOUR_TEXT[2])
  }

  handleNextTourStop(cancel?: string) {
    if (this.selectedBubbleBS.value) {
      const numStops = Object.keys(this.GUIDED_TOUR_TEXT).length;
      // console.log('bV hNTS tour stop: ', this.selectedBubbleBS.value.order);
      if (this.selectedBubbleBS.value.order === numStops) {
        this.handleCancelTour();
      } else {
        const nextInd = this.selectedBubbleBS.value.order < numStops ? this.selectedBubbleBS.value.order + 1 : 2;
        this.selectedBubbleBS.next(GUIDED_TOUR_TEXT[nextInd])
        // console.log('bV hNTS next tour stop: ', this.selectedBubbleBS.value);
      }
    }
  }
  
  handleCancelTour() {
    this.selectedBubbleBS.next(undefined);
    // console.log('bV hCT cancel tour: ', this.selectedBubbleBS.value);
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
    return this.selectedBoardBS.value.displayName === appName;
  }

  toggleTheme() {
    // console.log('bV tT toggle dark mode pre: ', this.darkModeOn);
    this.theme = this.theme === 'kanban-light-theme' ? 'kanban-dark-theme' : 'kanban-light-theme';
    this.darkModeOnBS.next(!this.darkModeOnBS.value);
    // console.log('bV tT toggle dark mode post: ', this.darkModeOn);
  }

  toggleShowDrawerButton(event: any) {
    // console.log('bV tSSB event: ', event);
    this.shouldShowOpenDrawerButton = !this.shouldShowOpenDrawerButton;
  }
}
