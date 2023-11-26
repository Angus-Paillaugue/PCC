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
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18')
];

export const server_loads = [0];

export const dictionary = {
		"/": [~2],
		"/about-us": [3],
		"/auth": [~4],
		"/contact-us": [5],
		"/dashboard": [~6],
		"/dashboard/admin": [~7],
		"/dashboard/admin/charts": [~8],
		"/dashboard/settings": [9],
		"/forgot-password": [~10],
		"/help": [~11],
		"/log-out": [~12],
		"/manage-newsletter/[email]": [~13],
		"/payment": [~14],
		"/pricing": [15],
		"/privacy-policy": [16],
		"/reset-password/[UUID]": [~17],
		"/terms-of-services": [18]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';