import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';
import { GuardService } from './core/services/guard.service';

const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{
		path: 'login',
		loadChildren: () => import('src/app/modules/authentication/authentication.module').then(m => m.AuthenticationModule)
	},
	{
		path: 'devices',
		loadChildren: () => import('src/app/modules/device/device.module').then(m => m.DeviceModule),
		canActivate: [GuardService]
	},
	{
		path: 'configs',
		loadChildren: () => import('src/app/modules/config/config.module').then(m => m.ConfigModule),
		canActivate: [GuardService]

	},
	{
		path: 'users',
		loadChildren: () => import('src/app/modules/users/users.module').then(m => m.UsersModule),
		canActivate: [GuardService]

	},
	{
		path: '**', component: PageNotFoundComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [JwtHelperService]
})
export class AppRoutingModule { }
