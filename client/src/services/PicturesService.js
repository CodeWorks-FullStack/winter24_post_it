import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Picture } from "@/models/Picture.js"
import { AppState } from "@/AppState.js"

class PicturesService {
  async getPicturesByAlbumId(albumId) {
    const response = await api.get(`api/albums/${albumId}/pictures`)
    logger.log('GOT PICTURES', response.data)
    const pictures = response.data.map(picturePOJO => new Picture(picturePOJO))
    AppState.pictures = pictures
  }
}

export const picturesService = new PicturesService()