import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { FirestoreService } from './../services/firestore.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AuthService {

    user: BehaviorSubject<User> = new BehaviorSubject(null);
    itemRef: AngularFireObject<any>;

    constructor(private afAuth: AngularFireAuth,private db: FirestoreService) {

        this.afAuth.authState
            .switchMap(auth => {
                if (auth) {
                    /// signed in                    
                    return this.db.doc$('users/' + auth.uid);
                } else {
                    /// not signed in
                    return Observable.of(null)
                }
            })
            .subscribe(user => {
                this.user.next(user)

            })
    }

    // Returns true if user is logged in
    get authenticated(): boolean {
        return this.afAuth.authState !== null;
    }

    // Returns current user data
    get currentUser(): any {
        return this.authenticated ? this.afAuth.authState : null;
    }

    // Returns
    get currentUserObservable(): any {
        return this.afAuth.authState
    }

    // Returns current user display name or Guest
    get currentUserDisplayName(): string {
        if (!this.afAuth.authState) {
            return 'Guest'
        } else {
            return this.afAuth.authState['displayName'] || 'User without a Name'
        }
    }

    //// Social Auth ////

    githubLogin() {
        const provider = new firebase.auth.GithubAuthProvider()
        return this.socialSignIn(provider);
    }

    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider()
        return this.socialSignIn(provider);
    }

    facebookLogin() {
        const provider = new firebase.auth.FacebookAuthProvider()
        return this.socialSignIn(provider);
    }

    twitterLogin() {
        const provider = new firebase.auth.TwitterAuthProvider()
        return this.socialSignIn(provider);
    }

    private socialSignIn(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then((credential) => {
                this.updateUser(credential.user);
            })
            .catch(error => console.log(error));
    }


    //// Email/Password Auth ////

    emailSignUp(email: string, password: string, data) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                data.email = user.email;
                data.roles = user.roles;
                data.uid = user.uid;
                data.photoURL = user.photoURL;
                data.terms = user.terms;
                this.createUser(data);
                this.addToUsernameCollection(data.username);
            })
            .catch(error => console.log(error));
    }

    emailLogin(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                //this.updateUser(user);
            })
            .catch(error => console.log(error));
    }

    // Sends email allowing user to reset password
    resetPassword(email: string) {
        const fbAuth = firebase.auth();

        return fbAuth.sendPasswordResetEmail(email)
            .then(() => console.log('email sent'))
            .catch((error) => console.log(error))
    }


    //// Sign Out ////

    signOut(): void {
        this.afAuth.auth.signOut();
    }

    createUser(authData) {
        const userData = new User(authData);
        console.log(userData);
        this.db.set('users/' + authData.uid, userData);
    }

    addToUsernameCollection(username){
        this.db.addCustomId('usernames',username);
    }


    //// Update user data ////    
    updateUser(authData) {
        const userData = new User(authData)
        this.db.update('users/' + authData.uid, authData);
    }

}
