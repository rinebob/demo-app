import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Firestore } from '@angular/fire/firestore';
import { FirebaseAppModule } from '@angular/fire/app';
import { BoardsService } from './boards.service';
import { BoardsStore } from './boards-store.service';

describe('BoardsService', () => {
  let service: BoardsService;
  let firestore: Firestore;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        FirebaseAppModule,
        HttpClientTestingModule,
      ],
      providers: [ 
        BoardsStore,
        { provide: Firestore, useValue: {}},
       ],
    });
    service = TestBed.inject(BoardsService);
    firestore = TestBed.inject(Firestore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(firestore).toBeTruthy();
  });
});
