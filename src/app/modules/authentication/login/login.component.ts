import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {

	loginForm!: FormGroup;

	subscription$: any;

	constructor(private _formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router) { }

	ngOnInit(): void {
		this.loginForm = this._formBuilder.group({
			email: ['ebn@senia.dk', [Validators.required, Validators.email]],
			password: ['123Qwe123!', Validators.required],
		});

		if (localStorage.getItem('jwt') && this.authService.isAuthenticated()) {
			this.router.navigate(['/configs/overview'])
		}
	}

	ngOnDestroy(): void {
		this.subscription$?.unsubscribe();
	}

	login() {
		this.subscription$ = this.authService.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value).subscribe({
			next: (data: any) => {
				localStorage.setItem('jwt', data);
				this.router.navigate(['/configs/overview'])
			},
			error: err => {
				console.error(err);
				alert(err.message)
			}
		})
	}
}
