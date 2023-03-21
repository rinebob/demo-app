import { TestBed } from '@angular/core/testing';

import { FbProjectsService } from './fb-projects.service';

describe('FbProjectsService', () => {
  let service: FbProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FbProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
