export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.svg","icons.svg"]),
	mimeTypes: {".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.BKnZCbz2.js",app:"_app/immutable/entry/app.cEZ3sFbH.js",imports:["_app/immutable/entry/start.BKnZCbz2.js","_app/immutable/chunks/sOgNyIww.js","_app/immutable/chunks/Dzp1cmwq.js","_app/immutable/entry/app.cEZ3sFbH.js","_app/immutable/chunks/sOgNyIww.js","_app/immutable/chunks/Dj6f-nJM.js","_app/immutable/chunks/DEDqjojZ.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
