import { AuthService } from './../../@core/auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

    redirectDelay: number = 0;
    showMessages: any = {};
    provider: string = '';

    errors: string[] = [];
    messages: string[] = [];
    user: any = {};
    submitted: boolean = false;
    public form: FormGroup;

    constructor(public auth: AuthService, private fb: FormBuilder,private toastr: ToastrService,private router: Router) { }

    ngOnInit() {
        this.form = this.fb.group({
            email: ['', null],
            password: ['', null]
        }
        );
    }

    login(): void {
        this.errors = this.messages = [];
        this.submitted = true;

        this.auth.emailLogin(
            this.form.get('email').value,
            this.form.get('password').value
        ).then((user: any) => {
            //success
            this.toastr.success('Ingelogd', 'Succesvol');
            this.router.navigate(['/pages']);
        }, (error: Error) => {
            //error
            console.log(error);
        });
    }

    /// Social Login

    signInWithGithub(): void {
        this.auth.githubLogin()
            .then(() => this.afterSignIn());
    }

    signInWithGoogle(): void {
        this.auth.googleLogin()
            .then(() => this.afterSignIn());
    }

    signInWithFacebook(): void {
        this.auth.facebookLogin()
            .then(() => this.afterSignIn());
    }

    signInWithTwitter(): void {
        this.auth.twitterLogin()
            .then(() => this.afterSignIn());
    }

    /// Shared

    private afterSignIn(): void {
        // Do after login stuff here, such router redirects, toast messages, etc.
        this.toastr.success('Ingelogd', 'Succesvol');
        this.router.navigate(['/pages']);
    }

}