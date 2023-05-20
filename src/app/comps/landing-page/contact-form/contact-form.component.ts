import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Contact } from 'src/app/common/interfaces';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFormComponent implements OnDestroy, OnInit {
  readonly destroy$ = new Subject<void>();
  @Output() contact = new EventEmitter<Contact>();

  contactForm: FormGroup;
  
  nameControl = new FormControl('', [Validators.required]);
  // emailControl = new FormControl('', [Validators.email, Validators.required]);
  emailControl = new FormControl('', [Validators.required]);
  messageControl = new FormControl('', Validators.required);
    

  get name() {return this.contactForm.get('nameControl')}
  get email() {return this.contactForm.get('emailControl')}
  get messageText() {return this.contactForm.get('messageControl')}

  constructor() {
    this.buildForm();
  }
  
  ngOnInit () {
    this.contactForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(changes => {
      // console.log('cF ngOI contact form value changes sub: ', changes);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  buildForm() {
    
    this.contactForm = new FormGroup({
      'nameControl': this.nameControl,
      'emailControl': this.emailControl,
      'messageControl': this.messageControl,
      
    });
  }

  handleSubmitForm() {
    const date = new Date();
    // console.log('cF hSF create date: ', date);
    const contact: Contact = {
      // date: new Date(),
      date,
      name: this.contactForm.get('nameControl')?.value,
      email: this.contactForm.get('emailControl')?.value,
      messageText: this.contactForm.get('messageControl')?.value,
    }

    // console.log('cF hSF create contact: ', contact);
    this.contact.emit(contact);
    this.contactForm.reset();
  }

}
