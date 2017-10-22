import { AuthService } from './../@core/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash'

@Injectable()
export class RoleService {
    userRoles: Array<string>; // roles of currently logged in user
    constructor(private auth: AuthService) {
        auth.user.map(user => {
            /// Set an array of user roles, ie ['admin', 'author', ...]
            return this.userRoles = _.keys(_.get(user, 'roles'))
        })
            .subscribe()
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
}