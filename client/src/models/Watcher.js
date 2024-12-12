import { Account } from "./Account.js"
import { Album } from "./Album.js"

export class Watcher {
  constructor(data) {
    this.id = data.id
    this.accountId = data.accountId
    this.albumId = data.albumId
    this.album = data.album ? new Album(data.album) : null
    this.profile = data.profile ? new Account(data.profile) : null
  }
}
