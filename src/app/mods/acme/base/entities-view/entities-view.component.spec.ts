import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesViewComponent } from './entities-view.component';

describe('EntitiesViewComponent', () => {
  let component: EntitiesViewComponent;
  let fixture: ComponentFixture<EntitiesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntitiesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntitiesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
