import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs';
import { BoardsService } from 'src/app/services/boards.service';
import {Board, FormMode, Task, TaskStatus} from '../../common/interfaces';
import { BOARD_INITIALIZER } from 'src/app/common/constants';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardFormComponent implements OnInit {
  boardForm: FormGroup;
  displayNameControl = new FormControl('');
  statusControl = new FormControl(TaskStatus.NOT_STARTED);

  statusValues = Object.values(TaskStatus);

  formMode: FormMode = FormMode.CREATE;

  boardBS = new BehaviorSubject<Board>(BOARD_INITIALIZER);
  
  constructor(private boardsService: BoardsService, 
    private router: Router,
    private route: ActivatedRoute) {
    this.buildBoardForm();
  }

  ngOnInit() {
    
    this.route.data.pipe().subscribe(data => {
      console.log('bF ctor route data: ', data);
      if (data && data['board'] && data['board'].displayName !== '') {
        console.log('bF ctor selected board from route: ', data['board']);
        this.boardBS.next(data['board']);
        this.formMode = FormMode.EDIT;
        this.populateForm(this.boardBS.value);
      }
    });
  }

  buildBoardForm() {
    this.boardForm = new FormGroup({
      'displayNameControl': this.displayNameControl,
      'statusControl': this.statusControl,
    })
  }

  populateForm(board: Board) {
    this.boardForm.patchValue({
      'displayNameControl': board.displayName ?? '',
      'statusControl': board.status ?? '',
    })
  }

  saveBoard() {
    const boardData = this.boardForm.value;
    console.log('bF sB board form values: ', boardData);
    const board: Board = {
      id: this.boardBS.value.id ?? undefined ,
      displayName: boardData.displayNameControl,
      status: boardData.statusControl,
      tasks: this.boardBS.value.tasks,
    }
    
    console.log('bF sB board to BE: ', board);
    if (this.formMode === FormMode.EDIT) {
      // const returnValue = this.boardsService.updateBoard(board);
      this.boardsService.updateBoard(board);
      this.router.navigateByUrl('boards');
      // if (returnValue) {
      // }

    } else {
      console.log('bF sB board object to create: ', board);
      this.boardsService.createBoard(board);
      this.router.navigateByUrl('boards');

    }
   }

  cancelOperation() {
    this.boardForm.reset();
    this.router.navigateByUrl('/back')
  }

}
