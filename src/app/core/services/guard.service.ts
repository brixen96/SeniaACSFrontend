import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
	providedIn: 'root'
})
export class GuardService {

	constructor(public authService: AuthenticationService, public router: Router) { }

	canActivate(): boolean {
		if (!this.authService.isAuthenticated()) {
			this.router.navigate(['/']);
			return false;
		}
		return true;
	}
}
