import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanModule } from '../../kanban.module';
import { DesignSystemComponent } from './design-system.component';

describe('DesignSystemComponent', () => {
  let component: DesignSystemComponent;
  let fixture: ComponentFixture<DesignSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignSystemComponent ],
      imports: [ KanbanModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
