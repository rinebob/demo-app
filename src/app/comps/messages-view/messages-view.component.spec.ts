import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesViewComponent } from './messages-view.component';
import { Firestore } from '@angular/fire/firestore';
import { AppModule } from 'src/app/app.module';

describe('MessagesViewComponent', () => {
  let component: MessagesViewComponent;
  let fixture: ComponentFixture<MessagesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagesViewComponent ],
      imports: [AppModule],
      providers: [
        {provide: Firestore, useValue: {}}
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
