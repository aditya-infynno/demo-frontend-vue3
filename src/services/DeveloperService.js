import axios from '@/utils/AuthAxios';

/*
|-------------------------------------------------------------------------------
| Developer Create
|-------------------------------------------------------------------------------
*/
export const store = async (token,data) => await axios(token).post('developer',data);
/*
|-------------------------------------------------------------------------------
| Developer Read
|-------------------------------------------------------------------------------
*/
export const index = async (token) => await axios(token).get('developer');
/*
|-------------------------------------------------------------------------------
| Developer Show Developer By ID
|-------------------------------------------------------------------------------
*/
export const show = async (token,id) => await axios(token).get(`developer/${id}/edit`);
/*
|-------------------------------------------------------------------------------
| Developer Update
|-------------------------------------------------------------------------------
*/
export const update = async (token,data,id) => await axios(token).post(`developer/${id}`,data);
/*
|-------------------------------------------------------------------------------
| Developer Delete
|-------------------------------------------------------------------------------
*/
export const destroy = async (token,id) => await axios(token).delete(`developer/${id}`);
/*
|-------------------------------------------------------------------------------
| Developer Delete Multiple
|-------------------------------------------------------------------------------
*/
export const destroyMany = async (token,data) => await axios(token).post(`developer/delete`,data);

/*
|-------------------------------------------------------------------------------
| Authenticate Token
|-------------------------------------------------------------------------------
*/
export const Auth = async token => await axios(token).get('user').then(res => res).catch(err => err.response);