import { UserService } from './../../services/user.service';
import { AuthService } from './../../@core/auth.service';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'nb-register',
    styleUrls: ['./register.component.scss'],
    templateUrl: 'register.component.html'
})
export class RegisterComponent {

    redirectDelay: number = 0;
    showMessages: any = {};
    provider: string = '';

    submitted = false;
    errors: string[] = [];
    messages: string[] = [];
    user: any = {};
    public form: FormGroup;
    usernameText: string;
    usernameAvailable: boolean;

    constructor(protected auth: AuthService, public userService: UserService, private fb: FormBuilder, private toastr: ToastrService, protected router: Router) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            username: ['', null],
            name: ['', null],
            lastname: ['', null],
            email: ['', null],
            password: '',
            confirmPassword: '',
            terms: ''
        });
    }

    checkUsername() {
        this.userService.checkUsername(this.usernameText).subscribe(username => {
            this.usernameAvailable = !username.$value
        })
    }

    updateUsername() {
        this.userService.updateUsername(this.usernameText);
    }

    register(): void {
        let registerData = {
            name: this.form.value['name'],
            lastname: this.form.value['lastname'],
            username: this.form.value['username'],
        }

        this.auth.emailSignUp(this.form.value['email'], this.form.value['password'], registerData)
            .then((user: any) => {
                this.updateUsername();
                this.toastr.success('Succesvol!', 'Geregistreerd!');
                this.router.navigate(['']);
            })
            .catch(error => this.toastr.error('Fout!', 'Opgetreden!'));

    }

}