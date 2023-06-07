import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegComponent } from './login-reg.component';
import { UserService } from 'src/app/services/user.service';

describe('LoginRegComponent', () => {
  let component: LoginRegComponent;
  let fixture: ComponentFixture<LoginRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRegComponent ],
      providers: [
        {provide: UserService, useValue: {user$: {}}},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
