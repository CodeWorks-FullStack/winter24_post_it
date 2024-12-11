import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Watcher } from "@/models/Watcher.js"
import { AppState } from "@/AppState.js"

class WatchersService {
  async deleteWatcher(watcherId) {
    const response = await api.delete(`api/watchers/${watcherId}`)
    logger.log('DELETED WATCHER', response.data)
  }
  async getMyWatchedAlbums() {
    const response = await api.get('account/watching')
    logger.log('GOT ALBUMS I AM WATCHING', response.data)
    const watchers = response.data.map(watcherPOJO => new Watcher(watcherPOJO))
    AppState.watchedAlbums = watchers
  }
}

export const watchersService = new WatchersService()