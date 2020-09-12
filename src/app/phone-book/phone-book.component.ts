import { Component, OnInit } from '@angular/core';
import {Contact} from '../contact';
import {ContactServiceService} from '../contact-service.service'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-phone-book',
  templateUrl: './phone-book.component.html',
  styleUrls: ['./phone-book.component.css']
})
export class PhoneBookComponent implements OnInit {
  contact: Contact;
  contacts: Contact[];
  title = 'angularpopup';
  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;
  showDetails: boolean;
  searchKey : string;
  searchText : string;
  


  constructor(private formBuilder: FormBuilder,
              private contactSer:ContactServiceService) {
      this.contacts= this.contactSer.getContacts();

  }
  show()
  {
    this.showModal = true;

  }
  hide()
  {
    this.showModal = false;
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        firstname: ['', [Validators.required, Validators.minLength(4)]],
        lastname: ['', [Validators.required, Validators.minLength(6)]],
        mobile: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(10)]]
    });
    this.showDetails = false;

}

public get firstname()
{
  return this.registerForm.get('firstname');
}
public get lastname()
{
  return this.registerForm.get('lastname');
}
public get mobile()
{
  return this.registerForm.get('mobile');
}


// convenience getter for easy access to form fields
get f() { return this.registerForm.controls; }

onSubmit() {
  //console.log(this.registerForm);
  if(this.registerForm.valid)
   {
    this.contact= new Contact();
    this.showDetails= true;
    this.contact.firstname= this.firstname.value;
    this.contact.lastname= this.lastname.value;
    this.contact.mobile= this.mobile.value;
    this.contactSer.addContact(this.contact);
    this.hide();
   }
   else 
   {
     this.submitted = true;
   }
   console.log(this.submitted)
}
onDelete()
    {
      this.contactSer.deleteContact(this.contact);
    }
  
OnSearch()
    {
      this.contacts = this.contactSer.getContacts().filter(a=>a.lastname.toLowerCase()==this.searchKey.trim().toLowerCase()||a.firstname.toLowerCase()==this.searchKey.trim().toLowerCase());
    }
onSortbyName()
    {
      this.contacts.sort((a, b) => (a.firstname < b.firstname ? -1 : 1));
    }
onSortbyNumber()
{
  this.contacts.sort((a, b) => (a.mobile < b.mobile ? -1 : 1));
}

}
