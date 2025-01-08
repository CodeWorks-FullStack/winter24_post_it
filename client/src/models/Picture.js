import { Album } from "./Album.js"

export class Picture {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.albumId = data.albumId
    this.imgUrl = data.imgUrl
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.creator = data.creator
    this.album = data.album ? new Album(data.album) : null
  }
}