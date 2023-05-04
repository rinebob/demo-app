import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModule } from 'src/app/app.module';
import { NameIntroComponent } from './name-intro.component';

describe('NameIntroComponent', () => {
  let component: NameIntroComponent;
  let fixture: ComponentFixture<NameIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameIntroComponent ],
      imports: [AppModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NameIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
