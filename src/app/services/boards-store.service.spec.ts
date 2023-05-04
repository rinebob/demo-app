import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Firestore } from '@angular/fire/firestore';
import { FirebaseAppModule } from '@angular/fire/app';
import { BoardsStore } from './boards-store.service';

describe('BoardsStore', () => {
  let service: BoardsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        FirebaseAppModule,
        HttpClientTestingModule,
      ],
      providers: [
        BoardsStore,
        {provide: Firestore, useValue: {}},
      ]
    });
    service = TestBed.inject(BoardsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
