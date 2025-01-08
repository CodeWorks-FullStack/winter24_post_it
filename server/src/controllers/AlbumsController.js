import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumsService } from "../services/AlbumsService.js";
import BaseController from "../utils/BaseController.js";
import { watchersService } from "../services/WatchersService.js";
import { picturesService } from "../services/PicturesService.js";
import { socketProvider } from "../SocketProvider.js";

export class AlbumsController extends BaseController {
  constructor() {
    super('api/albums')
    this.router
      .get('', this.getAllAlbums)
      .get('/:albumId', this.getAlbumById)
      .get('/:albumId/watchers', this.getWatchersByAlbumId)
      .get('/:albumId/pictures', this.getPicturesByAlbumId)
      .use(Auth0Provider.getAuthorizedUserInfo) // you must be logged in to do any method AFTER the .use
      .post('', this.createAlbum)
      .delete('/:albumId', this.archiveAlbum)
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

      socketProvider.messageAll('CREATED_ALBUM')
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

  /**
  * returns a single album from the database using the id from the route parameters
  * @param {import("express").Request} request
  * @param {import("express").Response} response
  * @param {import("express").NextFunction} next
  */
  async getAlbumById(request, response, next) {
    try {
      const albumId = request.params.albumId
      const album = await albumsService.getAlbumById(albumId)
      response.send(album)
    } catch (error) {
      next(error)
    }
  }
  /**
  * returns all profiles watching an album, with results filtered by the supplied album id from the route parameters
  * @param {import("express").Request} request
  * @param {import("express").Response} response
  * @param {import("express").NextFunction} next
  */
  async getWatchersByAlbumId(request, response, next) {
    try {
      const albumId = request.params.albumId
      const watchers = await watchersService.getWatchersByAlbumId(albumId)
      response.send(watchers)
    } catch (error) {
      next(error)
    }
  }

  /**
  * returns all pictures for an album, with results filtered by the supplied album id from the route parameters
  * @param {import("express").Request} request
  * @param {import("express").Response} response
  * @param {import("express").NextFunction} next
  */
  async getPicturesByAlbumId(request, response, next) {
    try {
      const albumId = request.params.albumId
      const pictures = await picturesService.getPicturesByAlbumId(albumId)
      response.send(pictures)
    } catch (error) {
      next(error)
    }
  }

  /**
  * flip the archived boolean property on an album using the supplied id from route parameters
  * @param {import("express").Request} request
  * @param {import("express").Response} response
  * @param {import("express").NextFunction} next
  */
  async archiveAlbum(request, response, next) {
    try {
      const albumId = request.params.albumId
      const userId = request.userInfo.id
      const album = await albumsService.archiveAlbum(albumId, userId)
      response.send(album)
    } catch (error) {
      next(error)
    }
  }
}