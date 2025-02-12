export class Album {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.title = data.title
    this.coverImg = data.coverImg
    this.archived = data.archived
    this.category = data.category
    this.description = data.description
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.creator = data.creator
    this.watcherCount = data.watcherCount
  }
}