import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class WatchersService {
  async getMyWatchedAlbums(userId) {
    const watchedAlbums = await dbContext.Watchers.find({ accountId: userId }).populate({
      path: 'album',
      populate: {
        path: 'creator watcherCount',
        select: 'name picture'
      }
    })
    return watchedAlbums
  }

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


  async deleteWatcher(watcherId, userId) {
    const watcherToDelete = await dbContext.Watchers.findById(watcherId)

    if (watcherToDelete == null) {
      throw new Error(`Invalid watcher id: ${watcherId}`)
    }

    if (watcherToDelete.accountId != userId) {
      throw new Forbidden("YOU ARE NOT ALLOWED TO DELETE SOMEONE ELSE'S WATCHER, BUD")
    }

    await watcherToDelete.deleteOne() // removes the document from the database

    return 'No longer watching that album'
  }
}

export const watchersService = new WatchersService()