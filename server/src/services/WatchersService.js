import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class WatchersService {
  async getMyWatchedAlbums(userId) {
    //                                                  { accountId: '670ff93326693293c631476f' }
    const watchedAlbums = await dbContext.Watchers.find({ accountId: userId }).populate({
      path: 'album', // populates album virtual from WatcherSchema
      populate: {
        path: 'creator watcherCount', // populates creator and watcherCount virtuals from AlbumSchema
        select: 'name picture' // only sends name and picture from account collection
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
    // NOTE find will only include watcher documents whose albumId matches the value passed down here
    //                                             { albumId: '6759c34aaeb2cbc36cce4664' }
    const watchers = await dbContext.Watchers.find({ albumId: albumId }).populate('profile', 'name picture')
    return watchers
  }


  async deleteWatcher(watcherId, userId) {
    const watcherToDelete = await dbContext.Watchers.findById(watcherId)

    // checks for a bad id
    if (watcherToDelete == null) {
      throw new Error(`Invalid watcher id: ${watcherId}`)
    }

    // checks for a bad stinky user
    if (watcherToDelete.accountId != userId) {
      throw new Forbidden("YOU ARE NOT ALLOWED TO DELETE SOMEONE ELSE'S WATCHER, BUD")
    }

    await watcherToDelete.deleteOne() // removes the document from the database

    return 'No longer watching that album'
  }
}

export const watchersService = new WatchersService()