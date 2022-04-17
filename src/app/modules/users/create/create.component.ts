import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/core/services/user.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

	userForm!: FormGroup;

	subscription$: any;

	constructor(private _formBuilder: FormBuilder, private userService: UserService, private messageService: MessageService) { }

	ngOnInit(): void {
		this.userForm = this._formBuilder.group({
			Email: ['', [Validators.required, Validators.email]],
			Password: ['', Validators.required],
			ConfirmPassword: ['', Validators.required],
			Name: ['', Validators.required],
			PhoneNumber: ['', Validators.min(8)]
		});
	}

	ngOnDestroy(): void {
		this.subscription$.unsubscribe();
	}

	createUser() {
		this.subscription$ = this.userService.createUser(this.userForm.value).subscribe({
			next: () => {
				this.userForm.reset();
				this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User created', life: 3000 });
			},
			error: err => {
				console.error(err);
			}
		})
	}

}
