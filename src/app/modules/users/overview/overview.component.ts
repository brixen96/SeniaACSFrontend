import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/core/services/user.service';
import { ConfirmationService } from 'primeng/api';

@Component({
	selector: 'app-overview',
	templateUrl: './overview.component.html',
	styleUrls: ['./overview.component.scss'],
	providers: [MessageService, ConfirmationService]
})
export class OverviewComponent implements OnInit, OnDestroy {

	subscription$: any;
	subscriptionDelete$: any;
	isLoading: boolean = true;


	users: Array<Object> = [];
	selectedUsers: Array<Object> = []

	constructor(private userService: UserService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

	ngOnInit(): void {
		this.subscription$ = this.userService.getAllUsers().subscribe({
			next: (data: any) => {
				this.users = data;
			},
			error: err => {
				console.error(err);
			}
		})

		this.subscription$.add(() => { this.isLoading = false });
	}

	ngOnDestroy(): void {
		if (this.subscription$) {
			this.subscription$?.unsubscribe();
		}
		this.subscriptionDelete$?.unsubscribe();
	}

	deleteUser(user: any) {
		this.confirmationService.confirm({
			message: 'Are you sure you want to delete "' + user.userName + '"?',
			header: 'Confirm',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.subscriptionDelete$ = this.userService.deleteUser(user.id).subscribe({
					next: (data: any) => {
						this.users = this.users.filter(val => val !== user);
						this.userService.deleteUser(user.id);
						this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
					},
					error: err => {
						console.error(err);
					}
				})

			}
		});
	}

}
