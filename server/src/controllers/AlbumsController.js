import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumsService } from "../services/AlbumsService.js";
import BaseController from "../utils/BaseController.js";

export class AlbumsController extends BaseController {
  constructor() {
    super('api/albums')
    this.router
      .get('', this.getAllAlbums)
      .use(Auth0Provider.getAuthorizedUserInfo) // you must be logged in to do any method AFTER the .use
      .post('', this.createAlbum)
  }


  /**
 * Creates a new album from request body and returns the album
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */
  async createAlbum(request, response, next) {
    try {
      const albumData = request.body
      // assign ownership using the information from the bearer token
      albumData.creatorId = request.userInfo.id
      const album = await albumsService.createAlbum(albumData)
      response.send(album)
    } catch (error) {
      next(error)
    }
  }

  /**
  * returns all albums from database
  * @param {import("express").Request} request
  * @param {import("express").Response} response
  * @param {import("express").NextFunction} next
  */
  async getAllAlbums(request, response, next) {
    try {
      const albums = await albumsService.getAllAlbums()
      response.send(albums)
    } catch (error) {
      next(error)
    }
  }
}