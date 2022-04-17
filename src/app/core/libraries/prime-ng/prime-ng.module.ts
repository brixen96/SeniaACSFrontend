import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { InplaceModule } from 'primeng/inplace';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { EditorModule } from 'primeng/editor';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { AutoCompleteModule } from 'primeng/autocomplete';


@NgModule({
	declarations: [

	],
	imports: [
		CommonModule,
	],
	exports: [
		InputTextModule,
		CardModule,
		MenubarModule,
		InplaceModule,
		ProgressBarModule,
		TagModule,
		ButtonModule,
		TableModule,
		PaginatorModule,
		ConfirmPopupModule,
		ToastModule,
		ToolbarModule,
		ConfirmDialogModule,
		InputTextareaModule,
		DialogModule,
		PasswordModule,
		AutoCompleteModule
	],
	providers: [ConfirmationService, MessageService]
})
export class PrimeNgModule { }
