import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConfigService } from 'src/app/core/services/config.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

	configForm!: FormGroup;

	subscription$: any;


	constructor(private _formBuilder: FormBuilder, private configService: ConfigService, private messageService: MessageService) { }

	ngOnInit(): void {
		this.configForm = this._formBuilder.group({
			name: ['', [Validators.required]],
			commands: ['', Validators.required],
		});
	}

	ngOnDestroy(): void {
		this.subscription$.unsubscribe();
	}

	createConfig() {
		let commandRaw = this.configForm.controls['commands'].value.split('\n')


		let filteredCommands = commandRaw.filter(function (value: any) {
			return value != '';
		})

		let commandString: string = "";

		filteredCommands.forEach((command: string) => {
			commandString += command
		});

		this.subscription$ = this.configService.createConfig(this.configForm.controls['name'].value, commandString).subscribe({
			next: () => {
				this.configForm.reset();
				this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Config created', life: 3000 });
			},
			error: err => {
				console.error(err);
			}
		})

	}

}
