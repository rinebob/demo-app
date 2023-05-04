import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';
import { FirebaseAppModule } from '@angular/fire/app';

import { KanbanModule } from '../../kanban.module';
import { BoardFormComponent } from './board-form.component';
import { BoardsStore } from '../../../../services/boards-store.service';

describe('BoardFormComponent', () => {
  let component: BoardFormComponent;
  let fixture: ComponentFixture<BoardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardFormComponent ],
      imports: [ 
        FirebaseAppModule,
        KanbanModule,
        NoopAnimationsModule,
       ],
      providers: [ 
        BoardsStore,
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: []},
        {provide: Firestore, useValue: {}}
       ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
