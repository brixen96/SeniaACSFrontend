import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';
import { PrimeNgModule } from './core/libraries/prime-ng/prime-ng.module';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function tokenGetter() {
	return localStorage.getItem("jwt");
}

@NgModule({
	declarations: [
		AppComponent,
		PageNotFoundComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgbModule,
		PrimeNgModule,
		HttpClientModule,
		BrowserAnimationsModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
			// Register the ServiceWorker as soon as the application is stable
			// or after 30 seconds (whichever comes first).
			registrationStrategy: 'registerWhenStable:30000'
		}),
		JwtModule.forRoot({
			config: {
				tokenGetter: tokenGetter
			},
		}),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule { }
