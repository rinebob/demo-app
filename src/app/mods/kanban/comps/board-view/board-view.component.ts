import { ChangeDetectionStrategy, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BehaviorSubject, Observable, Subject, takeUntil, withLatestFrom } from 'rxjs';
import { User } from '@angular/fire/auth';

import { BOARD_INITIALIZER, GUIDED_TOUR_TEXT, NO_BOARDS_TEXT, SAMPLE_APP_DISPLAY_NAME } from 'src/app/common/constants';
import { AppRoutes, Board, Column, DialogCloseResult, DialogResult, GuidedTourMetadata, Task, TourStop } from 'src/app/common/interfaces';
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

  allTasksByStatus$ = this.boardsStore.allTasksByStatus$;
  allColumns$ = this.boardsStore.allColumns$;
  allColumnsWithTasks$ = this.boardsStore.allColumnsWithTasks$;
  userSelectedColumns$ = this.boardsStore.userSelectedColumns$;
  numberOfTasksPerColumn$ = this.boardsStore.numberOfTasksPerColumn$;
  
  boardsBS = new BehaviorSubject<Board[]>([])
  selectedBoardBS = new BehaviorSubject<Board>(BOARD_INITIALIZER);
  
  tasksBS = new BehaviorSubject<Task[]>([]);
  selectedTaskBS = new BehaviorSubject<Task|undefined>(undefined);
  selectedTask$: Observable<Task|undefined> = this.selectedTaskBS;
  
  numBoardsBS = new BehaviorSubject<number>(0);
  numBoards$: Observable<number> = this.numBoardsBS;

  sampleBoardExistsBS = new BehaviorSubject<boolean>(false);
  sampleBoardExists$: Observable<boolean> = this.sampleBoardExistsBS;

  showAllBoards = true;
  showTasks = false;
  showForm = false;
  
  allColumns: Column[] = [];
  userSelectedColumns: Column[] = [];
  numTasksByColumn: {[key: string]: number};
  
  shouldShowOpenDrawerButton = true;
  darkModeToggleButtonColor: ThemePalette = 'primary';
  darkModeOnBS = new BehaviorSubject(false);
  darkModeOn$: Observable<boolean> = this.darkModeOnBS;
  
  topnavMenuCssClass = 'board-view-topnav-menu-css';
  boardsSelectPanelClass = 'boards-select-panel-class';

  readonly NO_BOARDS_TEXT = NO_BOARDS_TEXT;
  
  readonly GUIDED_TOUR_TEXT = GUIDED_TOUR_TEXT;
  readonly TourStop = TourStop;
  selectedBubbleBS = new BehaviorSubject<GuidedTourMetadata|undefined>(undefined);
  selectedBubble$: Observable<GuidedTourMetadata|undefined> = this.selectedBubbleBS;
  currentStop = 1;
  
  loggedInAsText = '';
  
  constructor(private boardsStore: BoardsStore, private dialogService: DialogService,
    private _overlayContainer: OverlayContainer, private projectsService: FbProjectsService,
    readonly userService: UserService, readonly router: Router,
    ) {

      // console.log('-------------------------------');
   
      this.applyTheme(this.theme);

      this.boards$.pipe(
        withLatestFrom(this.selectedBoard$)
      ).subscribe(([boards, selectedBoard]) => {
        // console.log('bV ctor store boards sub: ', boards);

        this.numBoardsBS.next(boards.length);
        this.sampleBoardExistsBS.next(this.updateSampleBoardExists(boards));

        if (boards.length > 0) {
          this.boardsBS.next([...boards]);
          if (boards[0] && selectedBoard && selectedBoard.displayName === '') {
            // the initializer is the selected board, so select the first in the list
            this.setSelectedBoard(boards[0]);
            // console.log('bV ctor setting default selectedBoard: ', boards[0]);
          } else {
            // selected board exists so use that as selected board
            const existingBoard = boards.find(b => b.id === selectedBoard.id) ?? boards[0];
            this.setSelectedBoard(existingBoard);
            // console.log('bV ctor setting existing selectedBoard: ', existingBoard);
          }
        } else {
          // no boards exist for this user so set to initializer
          this.setSelectedBoard(BOARD_INITIALIZER);
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
        }
      });

      this.user$.pipe(takeUntil(this.destroy$)).subscribe((user: User | null) => {
        //handle user state changes here. Note, that user will be null if there is no currently logged in user.
        // console.log('bV ctor user id/subscription: ', user?.uid, user);
        if (user) {
          this.ownerUidBS.next(user.uid);
          this.loggedInAsText = this.generateLoggedInAsText(user);
          // console.log('bV ctor getting boards for user: ', this.ownerUidBS.value);
          this.boardsStore.getAllBoardsForUser(this.ownerUidBS.value);
        }
      });
  
      // this.authState$.pipe(takeUntil(this.destroy$)).subscribe((user: User | null) => {
      //   //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
      //   // console.log('bV ctor auth state subscription: ',user);
      // });
  
      // this.idToken$.pipe(takeUntil(this.destroy$)).subscribe((token: string | null) => {
      //   //handle idToken changes here. Note, that user will be null if there is no currently logged in user.
      //   // console.log('bV ctor id token subscription: ', token);
      // });
  
      // this.isLoggedIn$.pipe(takeUntil(this.destroy$)).subscribe((status: boolean) => {
      //   // console.log('bV ctor logged in?: ', status);
      // });
      
      // this.isLoggedOut$.pipe(takeUntil(this.destroy$)).subscribe((status: boolean) => {
      //   // console.log('bV ctor logged out?: ', status);
      // });

      // this.selectedBubble$.pipe().subscribe(tourStop => {
      //   console.log('bV selectedBubble sub: ', tourStop);
      // });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  generateLoggedInAsText(user: User): string {
    const text = `Logged in as ${user.email ? user.email : 'anonymous'} with id ${user.uid}`
    // console.log('bV gLIAT logged in as text: ', text);
    return text;
  }

  updateSampleBoardExists(boards: Board[]) {
     const sampleBoard = boards.find(board => board.displayName === SAMPLE_APP_DISPLAY_NAME);
    // console.log('bV uSBE sample board: ', sampleBoard);
    // console.log('bV uSBE sample exists: ', !!sampleBoard);
    return !!sampleBoard;
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
    const board = sampleBoard.boards[0];

    const {tasks} = sampleBoard;
    // console.log('bV hASB tasks from build: ', tasks);
    // console.log('bV hASB sampleBoard: ', sampleBoard);
    
    board.ownerUid = this.ownerUidBS.value;
    // console.log('bV hASB board to BE: ', board);
    this.boardsStore.createBoard(board);

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

  handleOpenCreateBoardDialog() {
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
    // console.log('bV oBSD open boards select dialog called');
    
    const boardNames: string[] = [];
    for (const board of this.boardsBS.value) {
      boardNames.push(board.displayName);
    }

    const dialogData = {
      darkModeOn: this.darkModeOnBS.value,
      boardNames,
      selectedBoard: this.selectedBoardBS.value.displayName,
      theme: this.theme,
      showSampleBoardButton: !this.sampleBoardExistsBS.value,
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
        this.handleOpenCreateBoardDialog();
      }
      
      if (result['outcome'] === DialogCloseResult.TOGGLE_DARK_MODE) {
        // console.log('bV oBSD result = toggle dark mode');
        this.toggleTheme();
      }

      if (result['outcome'] === DialogCloseResult.ADD_SAMPLE_BOARD) {
        // console.log('bV oBSD result = add sample board');
        this.handleAddSampleBoard();
      }

    } else {
      // console.log('bV oBSD no board select result dude!  wtf???');
    }
  }
  
  handleStartGuidedTour() {
    // console.log('bV oGTD open guided tour called.  current stop: ', this.currentStop);
    this.selectedBubbleBS.next(GUIDED_TOUR_TEXT[this.currentStop]);
  }
  
  handleNextTourStop() {
    this.currentStop ++;
    this.selectedBubbleBS.next(GUIDED_TOUR_TEXT[this.currentStop]);
  }
  
  handleCancelTour() {
    this.selectedBubbleBS.next(undefined);
    this.currentStop = 1;
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
    this.boardsStore.reset();
    this.router.navigateByUrl(`${AppRoutes.KANBAN}/${AppRoutes.LOGOUT}`);
  }
}
