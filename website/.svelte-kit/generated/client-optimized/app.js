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
	() => import('./nodes/18'),
	() => import('./nodes/19')
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
		"/dashboard/admin/newsletter": [~9],
		"/dashboard/settings": [~10],
		"/forgot-password": [11],
		"/help": [~12],
		"/log-out": [~13],
		"/manage-newsletter/[email]": [~14],
		"/payment": [~15],
		"/pricing": [16],
		"/privacy-policy": [17],
		"/reset-password/[UUID]": [~18],
		"/terms-of-services": [19]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';