import { Auth0Provider } from "@bcwdev/auth0provider";
import { watchersService } from "../services/WatchersService.js";
import BaseController from "../utils/BaseController.js";

export class WatchersController extends BaseController {
  constructor() {
    super('api/watchers')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createWatcher)
      .delete('/:watcherId', this.deleteWatcher)
  }
  /**
    * creates a new watcher from the request body and returns it
    * @param {import("express").Request} request
    * @param {import("express").Response} response
    * @param {import("express").NextFunction} next
    */
  async createWatcher(request, response, next) {
    try {
      const watcherData = request.body
      watcherData.accountId = request.userInfo.id
      const watcher = await watchersService.createWatcher(watcherData)
      response.send(watcher)
    } catch (error) {
      next(error)
    }
  }

  /**
    * deletes a watcher using the id from the request parameters
    * @param {import("express").Request} request
    * @param {import("express").Response} response
    * @param {import("express").NextFunction} next
    */
  async deleteWatcher(request, response, next) {
    try {
      const watcherId = request.params.watcherId
      const userId = request.userInfo.id
      const message = await watchersService.deleteWatcher(watcherId, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}