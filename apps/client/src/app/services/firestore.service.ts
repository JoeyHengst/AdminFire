import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {
    AngularFirestore,
    AngularFirestoreDocument,
    AngularFirestoreCollection
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash'

// Custom types
type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T> = string | AngularFirestoreDocument<T>;

@Injectable()
export class FirestoreService {
    userRoles: Array<string>; // roles of currently logged in user
    usernames$: Observable<any>;
    constructor(private afs: AngularFirestore) {
        this.userRoles = [];
    }

    checkUsername(username: string) {
        if(!username){
            return;
        }        
        const doc = this.doc(`usernames/${username}`).snapshotChanges().take(1).toPromise();
        return doc.then(snap => {
            return snap.payload.exists ? true : false
        });
    }

    // Return a reference
    col<T>(ref: CollectionPredicate<T>, queryFn?): AngularFirestoreCollection<T> {
        return typeof ref === 'string' ? this.afs.collection<T>(ref, queryFn) : ref
    }
    doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
        return typeof ref === 'string' ? this.afs.doc<T>(ref) : ref
    }

    // Get data
    doc$<T>(ref: DocPredicate<T>): Observable<T> {
        return this.doc(ref).snapshotChanges().map(doc => {
            if (doc.payload.exists) {
                return doc.payload.data() as T
            }
        })
    }
    col$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
        return this.col(ref, queryFn).snapshotChanges().map(docs => {
            return docs.map(a => a.payload.doc.data()) as T[]
        });
    }

    // Get timestamp from backend server.
    get timestamp() {
        return firebase.firestore.FieldValue.serverTimestamp()
    }

    // Update data with a timestamp
    update<T>(ref: DocPredicate<T>, data: any) {
        return this.doc(ref).update({
            ...data,
            updatedAt: this.timestamp
        })
    }

    // Create data with a timestamp
    set<T>(ref: DocPredicate<T>, data: any) {
        const timestamp = this.timestamp;
        return this.doc(ref).set({
            ...data,
            updatedAt: timestamp,
            createdAt: timestamp
        })
    }

    // Add doc to collection with a timestamp
    add<T>(ref: CollectionPredicate<T>, data) {
        const timestamp = this.timestamp;
        const id = this.afs.createId();
        return this.col(ref).doc(id).set({
            ...data,
            id: id,
            updatedAt: timestamp,
            createdAt: timestamp
        })
    }

    // Add doc to collection with a timestamp
    addCustomId<T>(ref: CollectionPredicate<T>, id) {
        console.log('wat is id:', id);
        const timestamp = this.timestamp;        
        return this.col(ref).doc(id).set({
            updatedAt: timestamp,
            createdAt: timestamp
        })
    }

    // remove doc from collection
    remove<T>(ref: DocPredicate<T>) {
        return this.doc(ref).delete();
    }

    // Check if doc exist. If YES it will update if NO it will set a new document
    upsert<T>(ref: DocPredicate<T>, data: any) {
        const doc = this.doc(ref).snapshotChanges().take(1).toPromise()
        return doc.then(snap => {
            return snap.payload.exists ? this.update(ref, data) : this.set(ref, data)
        })
    }

    // Return document keys
    colWithIds$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<any[]> {
        return this.col(ref, queryFn).snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        });
    }

    // Methods to inspect data and latency for a given query
    inspectDoc(ref: DocPredicate<any>): void {
        const tick = new Date().getTime()
        this.doc(ref).snapshotChanges()
            .take(1)
            .do(d => {
                const tock = new Date().getTime() - tick
                console.log(`Loaded Document in ${tock}ms`, d)
            })
            .subscribe()
    }

    inspectCol(ref: CollectionPredicate<any>): void {
        const tick = new Date().getTime()
        this.col(ref).snapshotChanges()
            .take(1)
            .do(c => {
                const tock = new Date().getTime() - tick
                console.log(`Loaded Collection in ${tock}ms`, c)
            })
            .subscribe()
    }
}