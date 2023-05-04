import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Firestore } from '@angular/fire/firestore';
import { FirebaseAppModule } from '@angular/fire/app';

import { KanbanModule } from '../../kanban.module';
import { BoardViewComponent } from './board-view.component';
import { BoardsStore } from '../../../../services/boards-store.service';

describe('BoardViewComponent', () => {
  let component: BoardViewComponent;
  let fixture: ComponentFixture<BoardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardViewComponent ],
      imports: [ 
        FirebaseAppModule,
        KanbanModule,
        NoopAnimationsModule,
       ],
      providers: [ 
        BoardsStore,
        {provide: Firestore, useValue: {}}
       ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
