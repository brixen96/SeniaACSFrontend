import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
	providedIn: 'root'
})
export class DeviceService {

	url = environment.apiurl + 'Devices/';

	headers = {
		headers: {
			Authorization: "Bearer " + localStorage.getItem('jwt')
		}
	}

	constructor(private http: HttpClient) { }

	getAllDevices() {
		return this.http.get(this.url, this.headers);
	}

	getDeviceById(id: string) {
		return this.http.get(this.url + id, this.headers);
	}

	createDevice(device: any) {
		return this.http.post(this.url, device, this.headers);
	}

	editDevice(device: any, id: string) {
		return this.http.put(this.url + id, device, this.headers)
	}

	deleteDevice(id: string) {
		return this.http.delete(this.url + id, this.headers);
	}
}
