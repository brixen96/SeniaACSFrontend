import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DeviceService } from 'src/app/core/services/device.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

	deviceForm!: FormGroup;

	subscription$: any;

	constructor(private _formBuilder: FormBuilder, private deviceService: DeviceService, private messageService: MessageService) { }

	ngOnInit(): void {
		this.deviceForm = this._formBuilder.group({
			name: ['', [Validators.required]],
			serialNumber: ['', Validators.required],
			ipAddress: [''],
			sshUsername: [''],
			sshPassword: ['']
		});
	}

	ngOnDestroy(): void {
		this.subscription$.unsubscribe();
	}

	createDevice() {
		this.subscription$ = this.deviceService.createDevice(this.deviceForm.value).subscribe({
			next: () => {
				this.deviceForm.reset();
				this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Device created', life: 3000 });
			},
			error: err => {
				console.error(err);
			}
		})
	}

}
