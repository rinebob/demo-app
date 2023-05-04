import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';
import { FirebaseAppModule } from '@angular/fire/app';

import { KanbanModule } from '../../kanban.module';
import { DeleteConfirmComponent } from './delete-confirm.component';
import { BoardsStore } from 'src/app/services/boards-store.service';

describe('DeleteConfirmComponent', () => {
  let component: DeleteConfirmComponent;
  let fixture: ComponentFixture<DeleteConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteConfirmComponent ],
      imports: [ 
        FirebaseAppModule,
        KanbanModule,
       ],
      providers: [
        BoardsStore,
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: []},
        {provide: Firestore, useValue: {}},
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
