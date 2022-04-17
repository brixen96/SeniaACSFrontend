import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfigService } from 'src/app/core/services/config.service';
import { DeviceService } from 'src/app/core/services/device.service';

@Component({
	selector: 'app-overview',
	templateUrl: './overview.component.html',
	styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

	subscription$: any;
	runConfigSubscription$: any;
	deviceSubscription$: any;

	configs: Array<Object> = [];
	devices: Array<Object> = [];
	selectedConfigs: Array<Object> = [];
	selectedDevice: Array<Object> = [];

	commandsDialog: boolean = false;
	chosenConfig: any;

	configToExecuteForm!: FormGroup;

	configExecuteOutput: any;
	configOutputDialog: any;
	runConfigDialog: any;


	constructor(
		private _formBuilder: FormBuilder,
		private configService: ConfigService,
		private messageService: MessageService,
		private confirmationService: ConfirmationService,
		private deviceService: DeviceService) { }

	ngOnInit(): void {
		this.configToExecuteForm = this._formBuilder.group({
			ipAddress: ['', [Validators.required]],
			username: ['', Validators.required],
			password: ['', Validators.required],
		});

		this.subscription$ = this.configService.getAllConfigs().subscribe({
			next: (data: any) => {
				this.configs = data;
			},
			error: err => {
				console.error(err);
			}
		})

		this.deviceSubscription$ = this.deviceService.getAllDevices().subscribe({
			next: (data: any) => {
				this.devices = data;
			},
			error: err => {
				console.error(err);
			}
		})
	}

	ngOnDestroy(): void {
		this.subscription$?.unsubscribe();
	}

	deleteConfig(config: any) {
		this.confirmationService.confirm({
			message: 'Are you sure you want to delete "' + config.name + '"?',
			header: 'Confirm',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.subscription$ = this.configService.deleteConfig(config.id).subscribe({
					next: () => {
						this.configs = this.configs.filter(val => val !== config);
						this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Config Deleted', life: 3000 });
					},
					error: err => {
						console.error(err);
					}
				})
			}
		});
	}

	runConfig(config: any) {
		let configToExecute = {
			username: this.configToExecuteForm.controls['username'].value,
			password: this.configToExecuteForm.controls['password'].value,
			ipAddress: this.configToExecuteForm.controls['ipAddress'].value,
			command: config.command
		}

		this.confirmationService.confirm({
			message: 'Are you sure you want to run "' + config.name + '"?',
			header: 'Confirm',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.runConfigSubscription$ = this.configService.runConfig(configToExecute).subscribe({
					next: (data: any) => {
						console.log(data)
						this.messageService.add({ severity: 'success', summary: 'Config Executed', life: 3000 });
						this.configExecuteOutput = data;
						this.configOutputDialog = true;
						this.runConfigDialog = false;
					},
					error: err => {
						console.log(err)
					}
				})
			}
		});

		//this.configToExecuteForm.reset();
	}

	selectDevice(device: any) {
		this.configToExecuteForm.patchValue({
			ipAddress: device.ipAddress,
			username: device.sshUsername,
			password: device.sshPassword
		})
	}

	openRunConfigDialog(config: any) {
		this.chosenConfig = config;
		this.runConfigDialog = true;
	}

	openConfigCommandsDialog(config: any) {
		this.commandsDialog = true;
		this.chosenConfig = config;
	}
}
