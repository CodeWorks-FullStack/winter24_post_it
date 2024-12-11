import { dbContext } from "../db/DbContext.js"

class WatchersService {

  async createWatcher(watcherData) {
    const watcher = await dbContext.Watchers.create(watcherData)
    await watcher.populate('profile', 'name picture')
    await watcher.populate('album')
    return watcher
  }

  async getWatchersByAlbumId(albumId) {
    //                                             { albumId: '6759c34aaeb2cbc36cce4664' }
    const watchers = await dbContext.Watchers.find({ albumId: albumId }).populate('profile', 'name picture')
    return watchers
  }
}

export const watchersService = new WatchersService()