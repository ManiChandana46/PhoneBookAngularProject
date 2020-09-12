import { Injectable } from '@angular/core';
import {Contact} from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {
  private contacts : Contact[];

  constructor()
{
  this.contacts=[];
  var contact1,contact2;
  contact1= new Contact();
  contact1.firstname="Mani";
  contact1.lastname="Chandana";
  contact1.mobile="9493690985"
  this.contacts.push(contact1);
  contact2= new Contact();
  contact2.firstname="Akhil";
  contact2.lastname="Raja";
  contact2.mobile="8683064612"
  this.contacts.push(contact2);
}

getContacts():Contact[]
{
  return this.contacts;
}
addContact(c:Contact)
{
  this.contacts.push(c);
}
deleteContact(c:Contact)
{
  this.contacts.pop();
}
}
