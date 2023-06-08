import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AudioModule } from '../../audio.module';
import { CheckoutFormComponent } from './checkout-form.component';

describe('CheckoutFormComponent', () => {
  let component: CheckoutFormComponent;
  let fixture: ComponentFixture<CheckoutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutFormComponent ],
      imports: [ AudioModule, ReactiveFormsModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('has all the necessary form controls', () => {
    const controls = fixture.debugElement.queryAll(By.css('.checkout-form-control'));
    const radioButtons = fixture.debugElement.queryAll(By.css('.radio-button'));

    expect(controls.length).toEqual(10);
    expect(controls[0].attributes['formControlName']).toEqual('nameControl');
    expect(radioButtons.length).toEqual(2);
    expect(radioButtons[0].attributes['formControlName']).toEqual('paymentMethodControl');
  });
  
  it('emits form validity when value entered in a form field', fakeAsync(async () => {
    spyOn(component.formValidity, 'emit');
    const nameControl = component.checkoutForm.controls['nameControl'];
    
    nameControl.setValue('a');
    tick(1000);
    fixture.detectChanges();

    expect(component.formValidity.emit).toHaveBeenCalledWith('INVALID');
  }));
  
  it('form is invalid until form is filled out', fakeAsync(async () => {
    spyOn(component.formValidity, 'emit');
    const nameControl = component.checkoutForm.controls['nameControl'];
    
    nameControl.setValue('a');
    tick(1000);
    fixture.detectChanges();
    
    expect(component.formValidity.emit).toHaveBeenCalledWith('INVALID');
    
    component.populateCheckoutForm();
    tick(1000);
    fixture.detectChanges();
    
    expect(component.formValidity.emit).toHaveBeenCalledWith('VALID');
  }));
});
