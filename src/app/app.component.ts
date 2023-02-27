import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BoardsService } from './services/boards.service';
import { Board, Task } from './common/interfaces';
import { getTasksFromBoard } from './common/task_utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  destroy = new Subject<void>();
  title = 'demo-app';

  boards$: Observable<Board[]>;

  selectedBoardBS = new BehaviorSubject<Board | undefined>(undefined);
  selectedBoard$: Observable<Board | undefined> = this.selectedBoardBS;
  
  tasksBS = new BehaviorSubject<Task[]>([]);
  tasks$: Observable<Task[]> = this.tasksBS;

  selectedTaskBS = new BehaviorSubject<Task|undefined>(undefined);
  selectedTask$: Observable<Task|undefined> = this.selectedTaskBS;

  showAllBoards = true;
  showTasks = false;
  showForm = false;

  constructor(private boardsService: BoardsService, private router: Router, 
    private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.boards$ = boardsService.listBoards();
    
    this.matIconRegistry.addSvgIcon(
      `logo-light`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/logo-light.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `icon-light-theme`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/icon-light-theme.svg")
    );
  }

  ngOnInit() {
    this.boards$.pipe().subscribe(boards => {
      console.log('aC ngOI boards sub: ', boards);
    });
    this.tasks$.pipe().subscribe(tasks => {
      console.log('aC ngOI tasks sub: ', tasks);
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    
  }

  setSelectedBoard(board: Board) {
    this.selectedBoardBS.next(board);
    this.showAllBoards = false;
    this.showTasks = true;

    // this.getTasksFromBoard(board.id);

  }

  getTasksFromBoard(boardId: number) {
    console.log('aC gTFB boardId: ', boardId);
    const tasks = this.boardsService.getTasksFromBoard(boardId).subscribe(tasks => {
      this.tasksBS.next(tasks);
    });
  }

  setSelectedTask(taskId: number) {
    const task = this.selectedBoardBS.value?.tasks?.find(task => task.id === taskId);
    this.selectedTaskBS.next(task);
  }

  editTask(task: Task) {
    this.showTasks = false;
    this.showForm = true;
  }

  deleteTask(taskId: string) {}
}
