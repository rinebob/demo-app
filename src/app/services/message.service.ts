import { Injectable, inject } from '@angular/core';
import 'firebase/firestore';
import {DocumentData, Firestore, collection, collectionData, deleteDoc, doc, query, setDoc, updateDoc, where} from '@angular/fire/firestore';
import { of } from 'rxjs';

import { Contact } from '../common/interfaces';
import { MESSAGES_COLLECTION_TEXT } from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  db: Firestore = inject(Firestore);

  constructor() { }

  listMessages() {
    // console.log('mSvc lM list messages called');
    const messages = collection(this.db, MESSAGES_COLLECTION_TEXT);
    return collectionData(messages);
  }

  saveMessage(message: Contact) {
    // console.log('mSvc sM save message: ', message);

    const messagesCollectionRef = collection(this.db, MESSAGES_COLLECTION_TEXT);

    const docRef = doc(messagesCollectionRef);
    message.id = docRef.id;

    setDoc(docRef, message);
        
    return of(message);

  }

  deleteMessage(id: string) {
    // console.log('mSvc dM delete message with id: ', id);
    const messagesCollectionRef = collection(this.db, MESSAGES_COLLECTION_TEXT);
    const deleteMessageDocRef = doc(messagesCollectionRef, id.toString());
    const deletedMessage = deleteDoc(deleteMessageDocRef);
    return of();

  }
}
