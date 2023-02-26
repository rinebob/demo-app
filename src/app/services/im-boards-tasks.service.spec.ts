import { TestBed } from '@angular/core/testing';

import { ImBoardsTasksService } from './im-boards-tasks.service';

describe('ImBoardsTasksService', () => {
  let service: ImBoardsTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImBoardsTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
