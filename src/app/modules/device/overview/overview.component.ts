import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DeviceService } from 'src/app/core/services/device.service';

@Component({
	selector: 'app-overview',
	templateUrl: './overview.component.html',
	styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

	subscription$: any;

	devices: Array<Object> = [];
	chosenDevice: any;
	isLoading: boolean = true;

	showSSHPasswordDialog: any;

	constructor(private deviceService: DeviceService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

	ngOnInit(): void {
		this.subscription$ = this.deviceService.getAllDevices().subscribe({
			next: (data: any) => {
				this.devices = data;
			},
			error: err => {
				console.error(err);
			}
		})

		this.subscription$.add(() => { this.isLoading = false });
	}

	ngOnDestroy(): void {
		this.subscription$?.unsubscribe();
	}

	deleteDevice(device: any) {
		this.confirmationService.confirm({
			message: 'Are you sure you want to delete "' + device.name + '"?',
			header: 'Confirm',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.subscription$ = this.deviceService.deleteDevice(device.id).subscribe({
					next: () => {
						this.devices = this.devices.filter(val => val !== device);
						this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Device Deleted', life: 3000 });
					},
					error: err => {
						console.error(err);
					}
				})
			}
		});
	}

	openShowSSHPasswordDialog(device: any) {
		this.chosenDevice = device;
		this.showSSHPasswordDialog = true;
	}
}
