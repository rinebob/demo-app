import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MOCK_CUSTOMER } from '../../common/audio-mock-data';
import { AppText, Customer, PaymentMethod } from '../../common/au-interfaces';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutFormComponent {

  @Output() readonly formValidity = new EventEmitter<string>();
  @Output() readonly customer = new EventEmitter<Customer>();

  checkoutForm: FormGroup;
  nameControl = new FormControl('', Validators.required);
  emailControl = new FormControl('', Validators.required);
  phoneControl = new FormControl('', Validators.required);
  addressControl = new FormControl('', Validators.required);
  cityControl = new FormControl('', Validators.required);
  stateControl = new FormControl('', Validators.required);
  zipControl = new FormControl('', Validators.required);
  countryControl = new FormControl('', Validators.required);
  codControl = new FormControl('', Validators.required);
  eMoneyControl = new FormControl('');
  paymentMethodControl = new FormControl(PaymentMethod.COD, Validators.required);
  eMoneyNumberControl = new FormControl('');
  eMoneyPinControl = new FormControl('');

  readonly AppText = AppText;
  readonly PaymentMethod = PaymentMethod;

  constructor() {
    this.buildCheckoutForm();

    this.checkoutForm.statusChanges.pipe().subscribe(changes => {
      console.log('cF ctor checkout form status changes sub: ', changes);

      this.formValidity.emit(changes);

    });

    this.checkoutForm.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(changes => {
      // console.log('cF ctor checkout form value changes sub: ', changes);
      const customer: Customer = {
        name: changes.nameControl,
        email: changes.emailControl,
        phoneNumber: changes.phoneControl,
        address: changes.addressControl,
        city: changes.cityControl,
        state: changes.stateControl,
        zip: changes.zipControl,
        country: changes.countryControl,
        paymentMethod: changes.paymentMethodControl,
        eMoneyNumber: changes.eMoneyNumberControl,
        eMoneyPin: changes.eMoneyPinControl,
      }

      // console.log('cF ctor customer from form: ', customer);

      this.customer.emit(customer);

    });
  }

  buildCheckoutForm() {
    this.checkoutForm = new FormGroup({
      'nameControl': this.nameControl,
      'emailControl': this.emailControl,
      'phoneControl': this.phoneControl,
      'addressControl': this.addressControl,
      'cityControl': this.cityControl,
      'stateControl': this.stateControl,
      'zipControl': this.zipControl,
      'countryControl': this.countryControl,
      'paymentMethodControl': this.paymentMethodControl,
      'eMoneyNumberControl': this.eMoneyNumberControl,
      'eMoneyPinControl': this.eMoneyPinControl,
    });

  }

  populateCheckoutForm() {
    console.log('cP pCF populate form called');

    this.checkoutForm.patchValue({
      'nameControl': MOCK_CUSTOMER.name,
      'emailControl': MOCK_CUSTOMER.email,
      'phoneControl': MOCK_CUSTOMER.phoneNumber,
      'addressControl': MOCK_CUSTOMER.address,
      'cityControl': MOCK_CUSTOMER.city,
      'stateControl': MOCK_CUSTOMER.state,
      'zipControl': MOCK_CUSTOMER.zip,
      'countryControl': MOCK_CUSTOMER.country,
      'paymentMethodControl': MOCK_CUSTOMER.paymentMethod,
      'eMoneyNumberControl': MOCK_CUSTOMER.eMoneyNumber,
      'eMoneyPinControl': MOCK_CUSTOMER.eMoneyPin,
    });
  }
}
