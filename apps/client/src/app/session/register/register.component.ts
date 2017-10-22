import { FirestoreService } from './../../services/firestore.service';
import { AuthService } from './../../@core/auth.service';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'nb-register',
    styleUrls: ['./register.component.scss'],
    templateUrl: 'register.component.html'
})
export class RegisterComponent {

    static areEqual(c: AbstractControl): ValidationErrors | null {
        const keys: string[] = Object.keys(c.value);
        for (const i in keys) {
            if (i !== '0' && c.value[keys[+i - 1]] !== c.value[keys[i]]) {
                return { areEqual: true };
            }
        }
    }
    showSpinner: boolean = false;
    redirectDelay: number = 0;
    showMessages: any = {};
    provider: string = '';

    submitted = false;
    errors: string[] = [];
    messages: string[] = [];
    user: any = {};
    public form: FormGroup;
    usernameText: string;
    usernameAvailable: boolean = false;

    constructor(protected auth: AuthService, public db: FirestoreService, private fb: FormBuilder, private toastr: ToastrService, protected router: Router) {
        this.form = fb.group({
            username: ['', Validators.required],
            name: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            terms: ['', Validators.required]
        }, RegisterComponent.areEqual);
    }

    ngOnInit() {

    }

    checkUsername() {
        if (this.usernameText) {
            this.showSpinner = true;
            this.db.checkUsername(this.usernameText).then(username => {
                this.showSpinner = false;
                this.usernameAvailable = !username

            })
        }
    }

    register(): void {
        let registerData = {
            name: this.form.value['name'],
            lastname: this.form.value['lastname'],
            username: this.form.value['username'],
        }

        this.auth.emailSignUp(this.form.value['email'], this.form.value['password'], registerData)
            .then((user: any) => {
                this.toastr.success('Succesvol!', 'Geregistreerd!');
                this.router.navigate(['']);
            })
            .catch(error => this.toastr.error('Fout!', 'Opgetreden!'));

    }

}