import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { albumsService } from "./AlbumsService.js"

class PicturesService {
  async createPicture(pictureData) {
    const album = await albumsService.getAlbumById(pictureData.albumId)

    if (album.archived) {
      throw new Forbidden(`${album.title} is archived and no longer accepting new pictures`)
    }

    const picture = await dbContext.Pictures.create(pictureData)
    await picture.populate('creator', 'name picture')
    return picture
  }
}

export const picturesService = new PicturesService()