import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { OverviewComponent } from './overview/overview.component';

import { PrimeNgModule } from 'src/app/core/libraries/prime-ng/prime-ng.module';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';


@NgModule({
	declarations: [
		OverviewComponent,
		CreateComponent,
  EditComponent
	],
	imports: [
		CommonModule,
		UsersRoutingModule,
		PrimeNgModule,
		ReactiveFormsModule
	]
})
export class UsersModule { }
