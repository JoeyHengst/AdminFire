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

    constructor(protected auth: AuthService, private fb: FormBuilder, private toastr: ToastrService, protected router: Router) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            name: ['', null],
            lastname: ['', null],            
            email: ['', null],
            password: '',
            confirmPassword: '',
            terms: ''
        });
    }

    register(): void {        
        let registerData = {
            name: this.form.value['name'],
            lastname: this.form.value['lastname'],
            username: null,            
        }

        this.auth.emailSignUp(this.form.value['email'], this.form.value['password'], registerData)
            .then((user: any) => {
                this.toastr.success('Succesvol!', 'Geregistreerd!');                
                this.router.navigate(['']);
            })
            .catch(error => this.toastr.error('Fout!', 'Opgetreden!'));

    }

}