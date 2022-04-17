import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from './core/services/authentication.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'Senia ACS';
	items: MenuItem[] = [];
	isLoggedIn: boolean = false;

	constructor(private authService: AuthenticationService, route: ActivatedRoute) { }

	ngOnInit() {
		this.items = [
			{ label: 'Devices', icon: 'pi pi-fw pi-server', routerLink: '/devices/overview' },
			{ label: 'Configs', icon: 'pi pi-fw pi-file', routerLink: '/configs/overview' },
			{ label: 'Users', icon: 'pi pi-fw pi-users', routerLink: '/users/overview' }
		];
		this.isLoggedIn = this.authService.isAuthenticated();

	}

	isAuthenticated() {
		return this.authService.isAuthenticated();
	}

	logout() {
		localStorage.removeItem('jwt')
	}
}
