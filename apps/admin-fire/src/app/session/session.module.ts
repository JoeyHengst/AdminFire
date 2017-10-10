import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessionRoutes } from './session.routing';
import { SessionComponent } from './session.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NbLayoutModule, NbCardModule, NbCheckboxModule } from '@nebular/theme';

@NgModule({
    imports: [
        CommonModule,
        NbLayoutModule,
        NbCardModule,
        NbCheckboxModule,
        RouterModule.forChild(SessionRoutes),
        FormsModule,
        SharedModule,
        ReactiveFormsModule
    ],
    declarations: [
        ForgotPasswordComponent,
        LoginComponent,
        RegisterComponent,
        SessionComponent        
    ],
    exports: [
        ForgotPasswordComponent,
        LoginComponent,
        RegisterComponent,
        SessionComponent        
    ]
})

export class SessionModule { }
