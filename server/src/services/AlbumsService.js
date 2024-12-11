import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class AlbumsService {


  async createAlbum(albumData) {
    const album = await dbContext.Albums.create(albumData)
    await album.populate('creator', 'name picture')
    return album
  }
  async getAllAlbums() {
    const albums = await dbContext.Albums.find().populate('creator', 'name picture').populate('watcherCount').sort('-createdAt')
    return albums
  }

  async getAlbumById(albumId) {
    const album = await dbContext.Albums.findById(albumId).populate('creator', 'name picture')
    if (album == null) {
      throw new Error(`Invalid album id: ${albumId}`)
    }
    return album
  }

  async archiveAlbum(albumId, userId) {
    const albumToArchive = await this.getAlbumById(albumId)

    if (albumToArchive.creatorId != userId) {
      throw new Forbidden("YOU ARE NOT ALLOWED TO ARCHIVE SOMEONE ELSE'S ALBUM, PAL")
    }

    // flips bool
    albumToArchive.archived = !albumToArchive.archived

    await albumToArchive.save() //updates data in the database

    return albumToArchive
  }
}

export const albumsService = new AlbumsService()