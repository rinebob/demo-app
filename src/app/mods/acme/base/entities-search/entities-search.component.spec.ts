import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesSearchComponent } from './entities-search.component';

describe('EntitiesSearchComponent', () => {
  let component: EntitiesSearchComponent;
  let fixture: ComponentFixture<EntitiesSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntitiesSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntitiesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
