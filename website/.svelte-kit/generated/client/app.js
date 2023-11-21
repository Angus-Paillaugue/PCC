export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15')
];

export const server_loads = [0];

export const dictionary = {
		"/": [2],
		"/about-us": [3],
		"/auth": [~4],
		"/contact-us": [5],
		"/dashboard": [~6],
		"/dashboard/admin": [~7],
		"/dashboard/admin/charts": [~8],
		"/forgot-password": [~9],
		"/help": [~10],
		"/log-out": [~11],
		"/payment": [~12],
		"/pricing": [13],
		"/privacy-policy": [14],
		"/reset-password/[UUID]": [~15]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';