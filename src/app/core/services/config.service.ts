import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
	providedIn: 'root'
})
export class ConfigService {

	url = environment.apiurl + 'Configs/';

	headers = {
		headers: {
			Authorization: "Bearer " + localStorage.getItem('jwt')
		}
	}

	constructor(private http: HttpClient) { }

	getAllConfigs() {
		return this.http.get(this.url, this.headers);
	}

	getConfigById(id: string) {
		return this.http.get(this.url + id, this.headers);
	}

	createConfig(name: string, commands: string) {
		return this.http.post(this.url, { name: name, command: commands }, this.headers);
	}

	editConfig(name: string, commands: string, id: string) {
		return this.http.put(this.url + id, { id: id, name: name, command: commands }, this.headers)
	}

	deleteConfig(id: string) {
		return this.http.delete(this.url + id, this.headers);
	}

	runConfig(config: any) {
		return this.http.post(this.url + 'command', config, this.headers)
	}
}
