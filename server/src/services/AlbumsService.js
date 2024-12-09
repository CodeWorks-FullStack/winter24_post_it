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
}

export const albumsService = new AlbumsService()