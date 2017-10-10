import { AuthService } from './../../@core/auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-forgot-password-page',
    styleUrls: ['./forgot-password.component.scss'],
    templateUrl: 'forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {

    redirectDelay: number = 0;
    showMessages: any = {};
    provider: string = '';

    submitted = false;
    errors: string[] = [];
    messages: string[] = [];
    user: any = {};

    public form: FormGroup;

    constructor(protected auth: AuthService, private fb: FormBuilder, private toastr: ToastrService, protected router: Router) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            email: ['', null]
        });
    }

    requestPass(): void {
        this.errors = this.messages = [];
        this.submitted = true;
        this.auth.resetPassword(this.form.get('email').value)
            .then((user: any) => {
                this.toastr.success('Succesvol!', 'Controleer uw email voor een reset link');
                this.router.navigate(['']);
            })
            .catch(error => this.toastr.error('Fout!', 'Opgetreden!'));

    }

}