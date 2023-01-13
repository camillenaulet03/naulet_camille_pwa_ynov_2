import passwordRoutes from '../components/password/password-routes.js'
import Router from '@koa/router'

const API_ROUTER = new Router()

API_ROUTER.use('/password', passwordRoutes.routes(), passwordRoutes.allowedMethods())

export { API_ROUTER }
