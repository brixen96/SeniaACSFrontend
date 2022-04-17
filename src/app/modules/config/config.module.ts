import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
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
		ConfigRoutingModule,
		ReactiveFormsModule,
		PrimeNgModule
	]
})
export class ConfigModule { }
