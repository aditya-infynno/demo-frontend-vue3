import axios from 'axios';
import BaseUrl from './BaseUrl';

const AuthHeader = {
	'Content-Type': 'application/json',
	'Accept': 'application/json',
};

export default axios.create({
	baseURL: `${BaseUrl}api/`,
	headers: AuthHeader
});
