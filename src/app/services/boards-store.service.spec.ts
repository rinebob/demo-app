import { TestBed } from '@angular/core/testing';

import { BoardsStoreService } from './boards-store.service';

describe('BoardsStoreService', () => {
  let service: BoardsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
