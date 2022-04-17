import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceRoutingModule } from './device-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { PrimeNgModule } from 'src/app/core/libraries/prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
	declarations: [
		OverviewComponent,
  CreateComponent,
  EditComponent
	],
	imports: [
		CommonModule,
		DeviceRoutingModule,
		PrimeNgModule,
		ReactiveFormsModule
	]
})
export class DeviceModule { }
