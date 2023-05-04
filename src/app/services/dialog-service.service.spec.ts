import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';
import { FirebaseAppModule } from '@angular/fire/app';

import { DialogService } from './dialog-service.service';
import { BoardsStore } from '../services/boards-store.service';

describe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        FirebaseAppModule,
        HttpClientTestingModule,
      ],
      providers: [
        BoardsStore,
        {provide: MatDialog, useValue: {}},
        {provide: Firestore, useValue: {}}
      ],
    });
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
