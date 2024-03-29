import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanModule } from '../../kanban.module';
import { CreateColumnComponent } from './create-column.component';

describe('CreateColumnComponent', () => {
  let component: CreateColumnComponent;
  let fixture: ComponentFixture<CreateColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateColumnComponent ],
      imports: [ KanbanModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
