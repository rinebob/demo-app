import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BehaviorSubject, Observable, Subject, takeUntil, withLatestFrom } from 'rxjs';
import { User } from '@angular/fire/auth';

import { BOARD_INITIALIZER, GUIDED_TOUR_TEXT } from 'src/app/common/constants';
import { Board, Column, DialogCloseResult, DialogResult, GuidedTourMetadata, Task, TourStop } from 'src/app/common/interfaces';
import { BoardsStore } from 'src/app/services/boards-store.service';
import { DialogService } from 'src/app/services/dialog-service.service';
import { FbProjectsService } from 'src/app/services/fb-projects.service';
import { UserService } from 'src/app/services/user.service';
import { buildBoardsAndTasks } from '../../../../common/task_utils';
import { SAMPLE_APP, RAW_TASKS, RAW_SUBTASKS } from 'src/app/testing/mock-task-data';

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardViewComponent implements OnDestroy, OnInit {
  readonly destroy$ = new Subject<void>();
  @HostBinding('class') theme = 'kanban-light-theme';

  user$ = this.userService.user$;
  authState$ = this.userService.authState$;
  idToken$ = this.userService.idToken$;
  isLoggedIn$ = this.userService.isLoggedIn$;
  isLoggedOut$ = this.userService.isLoggedOut$;

  ownerUidBS = new BehaviorSubject<string>('');
  
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
    readonly userService: UserService, readonly router: Router,
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

      this.selectedBoard$.pipe(takeUntil(this.destroy$)).subscribe(board => {
        // console.log('bV ctor store selected board sub: ', board);
        if (board && board.displayName !== '') {
          this.selectedBoardBS.next(board);
          this.initializeBoardAndTasks(board);
        }
      });

      this.allColumns$.pipe(takeUntil(this.destroy$)).subscribe(columns => {
        // console.log('bV ctor all columns sub: ', columns);
        this.allColumns = columns;
      });

      this.userSelectedColumns$.pipe(takeUntil(this.destroy$)).subscribe(columns => {
        // console.log('bV ctor user selected columns sub: ', columns);
        this.userSelectedColumns = columns;
      });
  
      this.numberOfTasksPerColumn$.pipe(takeUntil(this.destroy$)).subscribe(numbers => {
        // console.log('bV ctor num tasks by column sub: ', numbers);
        this.numTasksByColumn = numbers;
      });

      // this.boards$.pipe(takeUntil(this.destroy$)).subscribe((boards) => {
      //   console.log('bV ctor boards store sub: ', boards);
      // });

      // this.selectedBoard$.pipe(takeUntil(this.destroy$)).subscribe(board => {
      //   console.log('bV ctor boards store selected board sub: ', board);
      // });

      this.tasks$.pipe(takeUntil(this.destroy$)).subscribe(tasks => {
        // console.log('bV ctor tasks sub: ', tasks);
        if (tasks && tasks.length > 0) {
          this.tasksBS.next(tasks);

        } else {
          
          // create the sample tasks for the sample board if they don't already exist

          const sampleBoard = this.boardsBS.value.find(board => board.displayName === 'Sample app')
          // console.log('bV ctor sample board: ', sampleBoard);

          if (sampleBoard && tasks?.length === 0) {
            this.addTasksToSampleBoard(sampleBoard);
          }
        }
      });

      this.user$.pipe(takeUntil(this.destroy$)).subscribe((user: User | null) => {
        //handle user state changes here. Note, that user will be null if there is no currently logged in user.
        // console.log('lP ctor user subscription: ',user);
        if (user) {
          this.ownerUidBS.next(user.uid);
        }
        // console.log('lP ctor user subscription: ',user?.uid);
      });
  
      this.authState$.pipe(takeUntil(this.destroy$)).subscribe((user: User | null) => {
        //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
        // console.log('lP ctor auth state subscription: ',user);
      });
  
      this.idToken$.pipe(takeUntil(this.destroy$)).subscribe((token: string | null) => {
        //handle idToken changes here. Note, that user will be null if there is no currently logged in user.
        // console.log('lP ctor id token subscription: ', token);
      });
  
      this.isLoggedIn$.pipe(takeUntil(this.destroy$)).subscribe((status: boolean) => {
        // console.log('lP ctor logged in?: ', status);
      });
      
      this.isLoggedOut$.pipe(takeUntil(this.destroy$)).subscribe((status: boolean) => {
        // console.log('lP ctor logged out?: ', status);
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  uploadData() {
    // console.log('bV uD upload data called');
    this.projectsService.uploadData();
  }

  handleResetStore() {
    this.boardsStore.reset();
  }

  // creates the sample board only.  Entry point for adding tasks is in the boards
  //  subscription in ctor
  handleAddSampleBoard() {
    const sampleBoard = buildBoardsAndTasks([SAMPLE_APP], RAW_TASKS, RAW_SUBTASKS);
    // console.log('bV hASB sampleBoard: ', sampleBoard);
    
    const board = sampleBoard.boards[0];
    board.ownerUid = this.ownerUidBS.value;
    // console.log('bV hASB board to BE: ', board);
    this.boardsStore.createBoard(board);
  }

  // Adds tasks to sample board created above
  addTasksToSampleBoard(board: Board) {
    // console.log('bV aTTSB sample board pre tasks: ', board);
    const sampleBoard = buildBoardsAndTasks([SAMPLE_APP], RAW_TASKS, RAW_SUBTASKS);
    const {tasks} = sampleBoard;

    
    for (const task of tasks) {
      task.boardId = board.id;
      task.ownerUid = this.ownerUidBS.value;
      // console.log('bV hASB task to BE: ', task);
      this.boardsStore.createTask(task);
    }
    
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

  handleLogout() {
    // console.log('bV hL board view logging out');
    this.userService.logout();
    this.router.navigateByUrl('login');
  }
}
