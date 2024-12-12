import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  /** @type {import('./models/Album.js').Album[]} */
  albums: [],
  /** @type {import('./models/Album.js').Album} */
  activeAlbum: null,
  /** @type {import('./models/Watcher.js').Watcher[]} */
  watchedAlbums: [],
  /** @type {import('./models/Watcher.js').Watcher[]} */
  watcherProfiles: [],
  /** @type {import('./models/Picture.js').Picture[]} */
  pictures: []
})

