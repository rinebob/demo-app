import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsSelectComponent } from './boards-select.component';

describe('BoardsSelectComponent', () => {
  let component: BoardsSelectComponent;
  let fixture: ComponentFixture<BoardsSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardsSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
