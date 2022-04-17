import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

@Injectable({
	providedIn: 'root',

})
export class AuthenticationService {

	url = environment.apiurl + 'User/';

	constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

	public isAuthenticated(): boolean {
		if (localStorage.getItem('jwt')) {
			return !this.jwtHelper.isTokenExpired(JSON.stringify(localStorage.getItem('jwt')!));
		} else {
			return false;
		}
	}

	login(email: string, password: string) {
		return this.http.post(this.url + 'Login', { email, password }, { responseType: 'text' })
	}
}
