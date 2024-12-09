import BaseController from "../utils/BaseController.js";

export class AlbumsController extends BaseController {
  constructor() {
    super('api/albums')
    this.router
      .post('', this.createAlbum)
  }


  /**
 * Creates a new album from request body and returns the album
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */
  createAlbum(request, response, next) {
    try {
      response.send("Post works!")
    } catch (error) {
      next(error)
    }
  }
}