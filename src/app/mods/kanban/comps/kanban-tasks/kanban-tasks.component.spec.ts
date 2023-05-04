import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';
import { FirebaseAppModule } from '@angular/fire/app';

import { KanbanModule } from '../../kanban.module';
import { KanbanTasksComponent } from './kanban-tasks.component';
import { BoardsStore } from '../../../../services/boards-store.service';

describe('KanbanTasksComponent', () => {
  let component: KanbanTasksComponent;
  let fixture: ComponentFixture<KanbanTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanTasksComponent ],
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

    fixture = TestBed.createComponent(KanbanTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
