import { Album } from "./Album.js"

export class Watcher {
  constructor(data) {
    this.id = data.id
    this.accountId = data.accountId
    this.albumId = data.albumId
    this.album = new Album(data.album)
  }
}



const data = {
  "_id": "6759bdbdf689382081686127",
  "accountId": "65f87bc1e02f1ee243874743",
  "albumId": "6759bdbdf689382081686123",
  "createdAt": "2024-12-11T16:28:45.570Z",
  "updatedAt": "2024-12-11T16:28:45.570Z",
  "__v": 0,
  "album": {
    "_id": "6759bdbdf689382081686123",
    "creatorId": "65f87bc1e02f1ee243874743",
    "title": "Retro Games",
    "coverImg": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    "archived": false,
    "category": "games",
    "createdAt": "2024-12-11T16:28:45.299Z",
    "updatedAt": "2024-12-11T16:28:45.299Z",
    "__v": 0,
    "id": "6759bdbdf689382081686123"
  },
  "id": "6759bdbdf689382081686127"
}