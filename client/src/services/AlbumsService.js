import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "../AppState.js"
import { Album } from "@/models/Album.js"

class AlbumsService {
  async createAlbum(albumData) {
    const response = await api.post('api/albums', albumData)
    logger.log('CREATED ALBUM', response.data)
    const album = new Album(response.data)
    // NOTE only unshift if api sorts data my showing newest first, otherwise push
    AppState.albums.unshift(album)
  }
  async getAlbums() {
    const response = await api.get('api/albums')
    logger.log('GOT ALBUMS 📔', response.data)
    const albums = response.data.map(albumPOJO => new Album(albumPOJO))
    AppState.albums = albums
  }
}

export const albumsService = new AlbumsService()