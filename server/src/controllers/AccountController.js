import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { watchersService } from '../services/WatchersService.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      // NOTE everything should be under the .use in this controller
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .put('', this.editUserAccount)
      .get('/watching', this.getMyWatchedAlbums)
  }


  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async editUserAccount(req, res, next) {
    try {
      const accountId = req.userInfo.id
      req.body.id = accountId
      const account = await accountService.updateAccount(req.userInfo, req.body)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  /**
* returns all watched albums for the logged in user
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/
  async getMyWatchedAlbums(request, response, next) {
    try {
      const userId = request.userInfo.id
      const watchedAlbums = await watchersService.getMyWatchedAlbums(userId)
      response.send(watchedAlbums)
    } catch (error) {
      next(error)
    }
  }

}
