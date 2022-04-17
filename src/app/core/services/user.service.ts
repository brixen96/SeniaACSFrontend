import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';



@Injectable({
	providedIn: 'root'
})
export class UserService {
	url = environment.apiurl + 'User/';

	headers = {
		headers: {
			Authorization: "Bearer " + localStorage.getItem('jwt')
		}
	}

	constructor(private http: HttpClient) { }

	getAllUsers() {
		return this.http.get(this.url)
	}

	getUserById(id: string) {
		return this.http.get(this.url + id, this.headers);
	}

	createUser(user: any) {
		return this.http.post(this.url, user, this.headers);
	}

	editUser(user: any, id: any) {
		return this.http.put(this.url + id, user, this.headers)
	}

	deleteUser(id: string) {
		return this.http.delete(this.url + id, this.headers);
	}
}
