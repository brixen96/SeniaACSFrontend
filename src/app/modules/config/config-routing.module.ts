import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
	{
		path: 'overview', component: OverviewComponent
	},
	{
		path: 'create', component: CreateComponent
	},
	{
		path: 'edit/:id', component: EditComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ConfigRoutingModule { }
