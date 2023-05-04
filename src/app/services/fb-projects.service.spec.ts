import { TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';
import { FirebaseAppModule } from '@angular/fire/app';

import { FbProjectsService } from './fb-projects.service';

describe('FbProjectsService', () => {
  let service: FbProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        FirebaseAppModule,
      ],
      providers: [
        {provide: Firestore, useValue: {}}
      ]
    });
    service = TestBed.inject(FbProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
