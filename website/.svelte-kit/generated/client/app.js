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
	() => import('./nodes/11')
];

export const server_loads = [0];

export const dictionary = {
		"/": [~2],
		"/about-us": [3],
		"/contact-us": [4],
		"/dashboard/admin": [~5],
		"/dashboard/admin/charts": [~6],
		"/dashboard/admin/newsletter": [~7],
		"/dashboard/settings": [~8],
		"/manage-newsletter/[email]": [~9],
		"/privacy-policy": [10],
		"/terms-of-services": [11]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';