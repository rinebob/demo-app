import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';
import { FirebaseAppModule } from '@angular/fire/app';

import { KanbanModule } from '../../kanban.module';
import { TaskFormComponent } from './task-form.component';
import { BoardsStore } from '../../../../services/boards-store.service';
import { UserService } from 'src/app/services/user.service';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskFormComponent ],
      imports: [ 
        FirebaseAppModule,
        KanbanModule,
        NoopAnimationsModule,
       ],
      providers: [
        BoardsStore,
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: []},
        {provide: Firestore, useValue: {}},
        {provide: UserService, useValue: {user$: {}}}
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
