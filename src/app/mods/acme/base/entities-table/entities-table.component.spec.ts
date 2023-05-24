import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesTableComponent } from './entities-table.component';

describe('EntitiesTableComponent', () => {
  let component: EntitiesTableComponent;
  let fixture: ComponentFixture<EntitiesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntitiesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntitiesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
