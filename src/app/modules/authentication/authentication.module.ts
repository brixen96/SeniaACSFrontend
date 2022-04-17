import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { PrimeNgModule } from 'src/app/core/libraries/prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
	declarations: [
		LoginComponent
	],
	imports: [
		CommonModule,
		AuthenticationRoutingModule,
		PrimeNgModule,
		ReactiveFormsModule,
		FormsModule
	]
})
export class AuthenticationModule { }
