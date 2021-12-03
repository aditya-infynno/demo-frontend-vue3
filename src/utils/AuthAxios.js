import axios from 'axios';
import BaseUrl from './BaseUrl';

const AxiosConfig = token => {

	const AuthHeader = {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Authorization': `Bearer ${token}`
	};

	return axios.create({
		baseURL: `${BaseUrl}api/`,
		headers: AuthHeader
	});
}


export default AxiosConfig


