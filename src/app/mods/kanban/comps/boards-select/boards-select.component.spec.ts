import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { KanbanModule } from '../../kanban.module';
import { BoardsSelectComponent } from './boards-select.component';

describe('BoardsSelectComponent', () => {
  let component: BoardsSelectComponent;
  let fixture: ComponentFixture<BoardsSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardsSelectComponent ],
      imports: [ KanbanModule ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: []},
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
