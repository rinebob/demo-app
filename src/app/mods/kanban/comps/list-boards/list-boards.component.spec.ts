import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';
import { FirebaseAppModule } from '@angular/fire/app';

import { KanbanModule } from '../../kanban.module';
import { ListBoardsComponent } from './list-boards.component';
import { BoardsStore } from '../../../../services/boards-store.service';
    
describe('ListBoardsComponent', () => {
  let component: ListBoardsComponent;
  let fixture: ComponentFixture<ListBoardsComponent>;
  let service: BoardsStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBoardsComponent ],
      imports: [ 
        FirebaseAppModule,
        KanbanModule,
       ],
       providers: [ 
        BoardsStore,
        {provide: Firestore, useValue: {}}
       ],
    })
    .compileComponents();
    
    service = TestBed.inject(BoardsStore);
    fixture = TestBed.createComponent(ListBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(service).toBeTruthy();
  });
});
