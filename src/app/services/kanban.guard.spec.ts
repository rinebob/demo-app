import { TestBed } from '@angular/core/testing';

import { KanbanGuard } from './kanban.guard';

describe('KanbanGuard', () => {
  let guard: KanbanGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(KanbanGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
