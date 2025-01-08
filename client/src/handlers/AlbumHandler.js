import { AppState } from "@/AppState.js";
import { Album } from "@/models/Album.js";
import Pop from "@/utils/Pop.js";
import { SocketHandler } from "@/utils/SocketHandler.js";

class AlbumHandler extends SocketHandler {
  constructor() {
    super()
    this.on('CREATED_ALBUM', this.onCreatedAlbum)
  }

  onCreatedAlbum(payload) {
    const album = new Album(payload)
    Pop.toast(`${album.creator.name} created a ${album.title} album!`)
    AppState.albums.unshift(album)
  }
}

export const albumHandler = new AlbumHandler()