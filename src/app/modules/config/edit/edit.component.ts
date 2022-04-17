import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfigService } from 'src/app/core/services/config.service';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

	configForm!: FormGroup;

	subscriptionEdit$: any;
	subscriptionConfig$: any;

	configId: any;
	config: Object = {};

	constructor(private _formBuilder: FormBuilder,
		private configService: ConfigService,
		private messageService: MessageService,
		private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.configForm = this._formBuilder.group({
			name: [''],
			commands: [''],
		});

		this.configId = this.route.snapshot.paramMap.get('id');

		this.subscriptionConfig$ = this.configService.getConfigById(this.configId).subscribe({
			next: (data: any) => {
				this.config = data;
				this.configForm.controls['commands'].setValue(data.command);
				this.configForm.controls['name'].setValue(data.name);
			},
			error: err => {
				console.error(err);
			}
		})
	}

	ngOnDestroy(): void {
		if (this.subscriptionEdit$) {
			this.subscriptionEdit$.unsubscribe();
		}
		this.subscriptionConfig$.unsubscribe();
	}

	editConfig() {
		let commandRaw = this.configForm.controls['commands'].value.split('\n')


		let filteredCommands = commandRaw.filter(function (value: any) {
			return value != '';
		})

		let commandString: string = "";

		filteredCommands.forEach((command: string) => {
			commandString += command
		});

		this.subscriptionEdit$ = this.configService.editConfig(this.configForm.controls['name'].value, commandString, this.configId).subscribe({
			next: () => {
			},
			error: err => {
				console.error(err);
			}
		})

		this.configForm.reset();
		this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Config successfully edited', life: 3000 });

	}

}
