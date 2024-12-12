import { Auth0Provider } from "@bcwdev/auth0provider";
import { picturesService } from "../services/PicturesService.js";
import BaseController from "../utils/BaseController.js";

export class PicturesController extends BaseController {
  constructor() {
    super('api/pictures')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPicture)
  }
  /**
* Creates a new picture from request body and returns the picture
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/

  async createPicture(request, response, next) {
    try {
      const pictureData = request.body
      pictureData.creatorId = request.userInfo.id
      const picture = await picturesService.createPicture(pictureData)
      response.send(picture)
    } catch (error) {
      next(error)
    }
  }
}