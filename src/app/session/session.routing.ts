import { Routes } from '@angular/router';
import { SessionComponent } from './session.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const SessionRoutes: Routes = [
    {
        path: 'auth',
        component: SessionComponent

    }
];
