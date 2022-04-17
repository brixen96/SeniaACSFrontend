import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DeviceService } from 'src/app/core/services/device.service';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

	deviceForm!: FormGroup;

	subscriptionEdit$: any;
	subscriptionDevice$: any;

	deviceId: any;
	device: Object = {};

	constructor(private _formBuilder: FormBuilder,
		private deviceService: DeviceService,
		private messageService: MessageService,
		private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.deviceForm = this._formBuilder.group({
			name: [''],
			serialNumber: [''],
			ipAddress: [''],
			sshUsername: [''],
			sshPassword: [''],
			id: this.route.snapshot.paramMap.get('id')
		});

		this.deviceId = this.route.snapshot.paramMap.get('id');

		this.subscriptionDevice$ = this.deviceService.getDeviceById(this.deviceId).subscribe({
			next: (data: any) => {
				this.device = data;
				this.deviceForm.controls['name'].setValue(data.name);
				this.deviceForm.controls['serialNumber'].setValue(data.serialNumber);
				this.deviceForm.controls['ipAddress'].setValue(data.ipAddress);
				this.deviceForm.controls['sshUsername'].setValue(data.sshUsername);
				this.deviceForm.controls['sshPassword'].setValue(data.sshPassword);
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
		this.subscriptionDevice$.unsubscribe();
	}

	editDevice() {
		this.subscriptionEdit$ = this.deviceService.editDevice(this.deviceForm.value, this.deviceId).subscribe({
			next: () => {
			},
			error: err => {
				console.error(err);
				this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Device successfully edited', life: 3000 });
			}
		})
	}

}
