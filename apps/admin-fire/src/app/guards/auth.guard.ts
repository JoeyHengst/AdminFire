import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../@core/auth.service';
import { tap , map, take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (this.auth.authenticated) { return true; }
        return this.auth.currentUserObservable
            .take(1)
            .map(user => !!user)
            .tap(loggedIn => {
                if (!loggedIn) {
                    console.log("access denied")
                    this.router.navigate(['/login']);
                }
            })
    }
}