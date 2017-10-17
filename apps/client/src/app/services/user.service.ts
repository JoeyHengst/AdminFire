import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../@core/auth.service';
import * as _ from 'lodash';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
    userRoles: Array<string>; // roles of currently logged in user
    currentUser: User;

    constructor(private auth: AuthService,
        private db: AngularFireDatabase) {

        auth.user.map(user => {
            this.currentUser = new User(auth);
            /// Set an array of user roles, ie ['admin', 'author', ...]
            return this.userRoles = _.keys(_.get(user, 'roles'))
        })
            .subscribe(user => {
                if (user) {
                    this.currentUser['username'] = user.username;
                }
            })
    }

    /// Get Data
    getUsers(name: string) {
        return this.db.list('users').valueChanges();
    }
    getUser(key) {
        return this.db.object('users' + '/' + key).valueChanges();
    }

    /// check and update Username
    get hasUsername() {
        return this.currentUser.username ? true : false
    }

    checkUsername(username: string) {
        username = username.toLowerCase()
        return this.db.object(`usernames/${username}`).snapshotChanges().map(action => {
            const $key = action.payload.key;
            const data = { $key, ...action.payload.val() };            
            return data;
          })
    }

    updateUsername(username: string) {
        let data = {}
        data[username] = this.currentUser.uid

        this.db.object(`/users/${this.currentUser.uid}`)
            .update({ "username": username })

        this.db.object(`/usernames`)
            .update(data)
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
    editUser(username, newData) {
        let data = {}
        data[username] = this.currentUser.uid;

        if (this.canEdit) {
            return this.db.object(`/users/${this.currentUser.uid}`).update(newData)
        }
        else console.log('action prevented!')
    }
    deleteUser(key) {
        if (this.canDelete) {
            return this.db.list('users' + '/' + key).remove()
        }
        else console.log('action prevented!')
    }
}