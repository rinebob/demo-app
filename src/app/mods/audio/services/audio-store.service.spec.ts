import { TestBed } from '@angular/core/testing';

import { AudioStore } from './audio-store.service';

describe('AudioStore', () => {
  let service: AudioStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
