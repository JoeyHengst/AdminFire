import { Note } from './../models/note.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthService } from '../@core/auth.service';
import { Data } from './../models/data.model';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash'
@Injectable()
export class DataService {
  userRoles: Array<string>; // roles of currently logged in user
  dataCollection: AngularFirestoreCollection<Data>;  
  multipleData: Observable<Data[]>;
  dataDocument: AngularFirestoreDocument<Data>;
  singleData: Observable<Data>;
  private notesCollection: AngularFirestoreCollection<Note>;

  constructor(private auth: AuthService, private db: AngularFireDatabase, private afs: AngularFirestore) {
    auth.user.map(user => {
      /// Set an array of user roles, ie ['admin', 'author', ...]
      return this.userRoles = _.keys(_.get(user, 'roles'))
    })
      .subscribe()
  }

  /// Get Data
  getPosts(name: string) {
    this.dataCollection = this.afs.collection(name, ref => {
      return ref.orderBy('name');
    });
    return this.multipleData = this.dataCollection.valueChanges();
  }

  getPost(name: string, key: string) {
    this.dataDocument = this.afs.doc(name + '/' + key);
    return this.singleData = this.dataDocument.valueChanges();
  }

  ///// Authorization Logic /////
  get canRead(): boolean {
    const allowed = ['admin', 'author', 'contributor', 'editor', 'subscriber']
    return this.matchingRole(allowed)
  }
  get canEdit(): boolean {
    const allowed = ['admin', 'author', 'contributor', 'editor']
    return this.matchingRole(allowed)
  }
  get canDelete(): boolean {
    const allowed = ['admin']
    return this.matchingRole(allowed)
  }
  /// Helper to determine if any matching roles exist
  private matchingRole(allowedRoles): boolean {
    return !_.isEmpty(_.intersection(allowedRoles, this.userRoles))
  }
  //// User Actions
  updateNote(key: string, newData) {
    if (this.canEdit) {
      
      this.afs.doc(key).update(newData);
    }
    else console.log('action prevented!')
  }

  createNote(name: string, note: Note) {
    // Persist a document id
    const id = this.afs.createId();
    this.notesCollection = this.afs.collection<Note>(name);
    const data: Note = {
      id: id,
      name: note.name,
      description: note.description,
      label: note.label || [],
      color: note.color,
      date: note.date || new Date      
    }
    this.notesCollection.doc(id).set(data);
  }

  deletePost(name: string, key) {
    if (this.canDelete) {
      this.dataCollection = this.afs.collection<Note>(name);
      return this.dataCollection.doc(key).delete();
    }
    else console.log('action prevented!')
  }
}