export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["128-icon.png","convertTo.webp","Forgot_password_illustration.png","Heart_illustration.png","openInPandabuy.webp","pandabuyLogo.webp","questionMark.webp","robots.txt","Square_logo.webp","Wide_logo.webp","workingMarketplaces.webp","yupooInterfaceReDesign.webp"]),
	mimeTypes: {".png":"image/png",".webp":"image/webp",".txt":"text/plain"},
	_: {
		client: {"start":"_app/immutable/entry/start.7fce7011.js","app":"_app/immutable/entry/app.19c97ebd.js","imports":["_app/immutable/entry/start.7fce7011.js","_app/immutable/chunks/scheduler.2c72f06e.js","_app/immutable/chunks/singletons.bf7d3c8c.js","_app/immutable/chunks/index.531e6357.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/entry/app.19c97ebd.js","_app/immutable/chunks/scheduler.2c72f06e.js","_app/immutable/chunks/index.d3a2f505.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js')),
			__memo(() => import('./nodes/13.js')),
			__memo(() => import('./nodes/14.js')),
			__memo(() => import('./nodes/15.js')),
			__memo(() => import('./nodes/16.js')),
			__memo(() => import('./nodes/17.js')),
			__memo(() => import('./nodes/18.js')),
			__memo(() => import('./nodes/19.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about-us",
				pattern: /^\/about-us\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/api/deleteUser",
				pattern: /^\/api\/deleteUser\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/deleteUser/_server.js'))
			},
			{
				id: "/api/exchange-rates/[currency]",
				pattern: /^\/api\/exchange-rates\/([^/]+?)\/?$/,
				params: [{"name":"currency","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/exchange-rates/_currency_/_server.js'))
			},
			{
				id: "/api/update-exchange-rates",
				pattern: /^\/api\/update-exchange-rates\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/update-exchange-rates/_server.js'))
			},
			{
				id: "/api/updateNewsletter",
				pattern: /^\/api\/updateNewsletter\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/updateNewsletter/_server.js'))
			},
			{
				id: "/api/updateUser",
				pattern: /^\/api\/updateUser\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/updateUser/_server.js'))
			},
			{
				id: "/auth",
				pattern: /^\/auth\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/checkPremium",
				pattern: /^\/checkPremium\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/checkPremium/_server.js'))
			},
			{
				id: "/contact-us",
				pattern: /^\/contact-us\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/dashboard/admin",
				pattern: /^\/dashboard\/admin\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/dashboard/admin/charts",
				pattern: /^\/dashboard\/admin\/charts\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/dashboard/admin/newsletter",
				pattern: /^\/dashboard\/admin\/newsletter\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/dashboard/settings",
				pattern: /^\/dashboard\/settings\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/forgot-password",
				pattern: /^\/forgot-password\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/help",
				pattern: /^\/help\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/log-out",
				pattern: /^\/log-out\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/manage-newsletter/[email]",
				pattern: /^\/manage-newsletter\/([^/]+?)\/?$/,
				params: [{"name":"email","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/payment-intent",
				pattern: /^\/payment-intent\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/payment-intent/_server.js'))
			},
			{
				id: "/payment",
				pattern: /^\/payment\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/pricing",
				pattern: /^\/pricing\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/privacy-policy",
				pattern: /^\/privacy-policy\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/reset-password/[UUID]",
				pattern: /^\/reset-password\/([^/]+?)\/?$/,
				params: [{"name":"UUID","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/terms-of-services",
				pattern: /^\/terms-of-services\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/webhook",
				pattern: /^\/webhook\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/webhook/_server.js'))
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
