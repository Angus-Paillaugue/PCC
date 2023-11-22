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
	() => import('./nodes/15'),
	() => import('./nodes/16')
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
		"/forgot-password": [9],
		"/help": [~10],
		"/log-out": [~11],
		"/manage-newsletter/[email]": [~12],
		"/payment": [~13],
		"/pricing": [14],
		"/privacy-policy": [15],
		"/reset-password/[UUID]": [~16]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';