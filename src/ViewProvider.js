import './ViewFactory'
import './ViewCacheCommand'
import './ViewClearCommand'

export async function ViewProvider(app) {
	app.view = new ViewFactory(app)
	await app.view.bootstrap()

	if(!app.routes.isNil) {
		app.routes.use((req, res, next) => {
			res.locals.url = app.url.clone(req)
			next()
		})
	}

	if(!app.cli.isNil) {
		app.cli.register(ViewCacheCommand)
		app.cli.register(ViewClearCommand)
	}
}

ViewProvider.shutdown = app => app.view.shutdown()
ViewProvider.priority = 30000
