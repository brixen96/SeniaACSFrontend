import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/core/services/user.service';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

	userForm!: FormGroup;
	userId: any = "";

	subscriptionEdit$: any;
	subscriptionUser$: any;


	constructor(private _formBuilder: FormBuilder,
		private userService: UserService,
		private messageService: MessageService,
		private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.userForm = this._formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			phoneNumber: [''],
			password: [''],
			confirmPassword: [''],
		});

		this.userId = this.route.snapshot.paramMap.get('id');

		this.subscriptionUser$ = this.userService.getUserById(this.userId).subscribe({
			next: (data: any) => {
				this.userForm.controls['email'].setValue(data.email);
				this.userForm.controls['phoneNumber'].setValue(data.name);
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
		this.subscriptionUser$.unsubscribe();
	}

	editUser() {
		this.subscriptionEdit$ = this.userService.editUser(this.userForm.value, this.userId).subscribe({
			next: (data: any) => {
				console.log(data)
				this.userForm.reset();
				this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User successfully edited', life: 3000 });
			},
			error: err => {
				console.error(err);
			}
		})



	}
}
