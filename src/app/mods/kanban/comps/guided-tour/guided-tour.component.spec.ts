import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanModule } from '../../kanban.module';
import { GuidedTourComponent } from './guided-tour.component';

describe('GuidedTourComponent', () => {
  let component: GuidedTourComponent;
  let fixture: ComponentFixture<GuidedTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuidedTourComponent ],
      imports: [ KanbanModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuidedTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
