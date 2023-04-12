import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/common/interfaces';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFormComponent implements OnInit {
  @Output() contact = new EventEmitter<Contact>();

  contactForm: FormGroup;
  
  nameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', Validators.required);
  messageControl = new FormControl('', Validators.required);
  

  get name() {return this.contactForm.get('nameControl')}
  get email() {return this.contactForm.get('emailControl')}
  get message() {return this.contactForm.get('messageControl')}

  constructor() {
    this.buildForm();
  }
  
  ngOnInit () {
    this.contactForm.valueChanges.pipe().subscribe(changes => {
      // console.log('cF ngOI contact form value changes sub: ', changes);
    });
  }

  buildForm() {
    
    this.contactForm = new FormGroup({
      'nameControl': this.nameControl,
      'emailControl': this.emailControl,
      'messageControl': this.messageControl,
      
    });
  }

  handleSubmitForm() {
    const contact: Contact = {
      name: this.contactForm.get('nameControl')?.value,
      email: this.contactForm.get('emailControl')?.value,
      message: this.contactForm.get('messageControl')?.value,
    }

    // console.log('cF hSF create contact: ', contact);
    this.contact.emit(contact);
  }

}
