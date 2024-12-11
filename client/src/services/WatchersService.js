import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"

class WatchersService {
  async getMyWatchedAlbums() {
    const response = await api.get('account/watching')
    logger.log('GOT ALBUMS I AM WATCHING', response.data)
  }
}

export const watchersService = new WatchersService()