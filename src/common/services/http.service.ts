/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import errorLog from './error-log.service';
import { AUTH_TOKEN } from '../constants/constants';
import localStore from './localstorage.service';
;

declare global {
	interface Window {
		HttpService?: any;
	}
}

class HttpService {
    service: any;
	constructor() {
		let service = null;
		if (!window.HttpService) {
			service = axios.create();
			service.interceptors.request.use(
				this.handleRequestSuccess,
				this.handleRequestError
			);
			service.interceptors.response.use(
				this.handleResponseSuccess,
				this.handleResponseError
			);
			window.HttpService = service;
		}

		this.service = window.HttpService;
	}

	// HTTP interceptor handlers
	handleRequestSuccess = (config: any) => {
		// Do something before request is sent
		return config;
	};
	handleRequestError = (error: any) => {
		// Do something with request error
		return Promise.reject(error);
	};
	handleResponseSuccess = (response: any) => {
		return response;
	};

	handleResponseError = (error: { response: { status: any; }; }) => {
		switch (error.response.status) {
			case 401:
				break;
			case 404:
				break;
			default:
				// 500
				break;
		}
		console.log(error.response);
		errorLog.log(error, 'HTTP Response Error');
		return Promise.reject(error);
	};

	//set headers
	get config() {
		const token = localStore.get(AUTH_TOKEN) || '';
		return {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				Authorization: `Bearer ${token}`,
			},
		};
	}

	// GET Request
	get(path: any) {
		return this.service.get(path, this.config);
	}
	// POST Request
	post(path: any, payload: any) {
		return this.service.post(path, payload, this.config);
	}
	// PATCH Request
	patch(path: any, payload: any) {
		return this.service.patch(path, payload, this.config);
	}
	// PUT Request
	put(path: any, payload: any) {
		return this.service.put(path, payload, this.config);
	}
	// DELETE Request
	delete(path: any, id: any) {
		return this.service.delete(`${path}/${id}`, this.config);
	}
}

const http = new HttpService();
const httpInstance = window.HttpService || null;

export { http, httpInstance };