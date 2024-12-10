import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "../AppState.js"
import { Album } from "@/models/Album.js"

class AlbumsService {
  async archiveAlbum(albumId) {
    const response = await api.delete(`api/albums/${albumId}`)
    logger.log('ARCHIVED ALBUM', response.data)
    const album = new Album(response.data)
    AppState.activeAlbum = album
  }
  async getAlbumById(albumId) {
    AppState.activeAlbum = null
    const response = await api.get(`api/albums/${albumId}`)
    logger.log('GOT ALBUM BY ID', response.data)
    const album = new Album(response.data)
    AppState.activeAlbum = album
  }
  async createAlbum(albumData) {
    const response = await api.post('api/albums', albumData)
    logger.log('CREATED ALBUM', response.data)
    const album = new Album(response.data)
    // NOTE only unshift if api sorts data my showing newest first, otherwise push
    AppState.albums.unshift(album)
    return album
  }
  async getAlbums() {
    const response = await api.get('api/albums')
    logger.log('GOT ALBUMS 📔', response.data)
    const albums = response.data.map(albumPOJO => new Album(albumPOJO))
    AppState.albums = albums
  }
}

export const albumsService = new AlbumsService()