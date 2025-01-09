import { Auth0Provider } from "@bcwdev/auth0provider";
import { uploadsService } from "../services/UploadsService.js";
import BaseController from "../utils/BaseController.js";
import { logger } from "../utils/Logger.js";

import fileUpload from 'express-fileupload'

export class UploadsController extends BaseController {
  constructor() {
    super('api/upload')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .use(fileUpload())
      .post('', this.uploadImage)
  }

  async uploadImage(request, response, next) {
    try {
      logger.log(request.files)
      const image = request.files.image
      const userId = request.userInfo.id
      const url = await uploadsService.uploadImage(image, userId)
      response.send(url)
    } catch (error) {
      next(error)
    }
  }
}
