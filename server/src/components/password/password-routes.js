import Router from '@koa/router'
import * as PasswordControllers from './password-controllers.js'

const password = new Router()

password.post('/', PasswordControllers.create)

export default password
