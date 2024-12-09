import { dbContext } from "../db/DbContext.js"

class AlbumsService {


  async createAlbum(albumData) {
    const album = await dbContext.Albums.create(albumData)
    await album.populate('creator', 'name picture')
    return album
  }
  async getAllAlbums() {
    const albums = await dbContext.Albums.find().populate('creator', 'name picture')
    return albums
  }

  async getAlbumById(albumId) {
    const album = await dbContext.Albums.findById(albumId).populate('creator', 'name picture')
    return album
  }

  async archiveAlbum(albumId) {
    const albumToArchive = await this.getAlbumById(albumId)

    // flips bool
    albumToArchive.archived = !albumToArchive.archived

    await albumToArchive.save() //updates data in the database

    return albumToArchive
  }
}

export const albumsService = new AlbumsService()