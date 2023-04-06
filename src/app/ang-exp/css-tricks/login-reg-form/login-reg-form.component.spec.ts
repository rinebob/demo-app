import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegFormComponent } from './login-reg-form.component';

describe('LoginRegFormComponent', () => {
  let component: LoginRegFormComponent;
  let fixture: ComponentFixture<LoginRegFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRegFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginRegFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
