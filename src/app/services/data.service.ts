import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../@core/auth.service';
import * as _ from 'lodash'
@Injectable()
export class DataService {
  userRoles: Array<string>; // roles of currently logged in user
  constructor(private auth: AuthService,
    private db: AngularFireDatabase) {
    auth.user.map(user => {
      /// Set an array of user roles, ie ['admin', 'author', ...]
      return this.userRoles = _.keys(_.get(user, 'roles'))
    })
      .subscribe()
  }

  /// Get Data
  getPosts(name: string) {
    return this.db.list(name)
  }
  getPost(name: string, key) {
    return this.db.object(name + '/' + key)
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
  editPost(name: string, post, newData) {
    if (this.canEdit) {
      return this.db.object(name + '/' + post.$key).update(newData)
    }
    else console.log('action prevented!')
  }
  deletePost(name: string, key) {
    if (this.canDelete) {
      return this.db.list(name + '/' + key).remove()
    }
    else console.log('action prevented!')
  }
}