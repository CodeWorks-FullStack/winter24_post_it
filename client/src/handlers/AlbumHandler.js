import Pop from "@/utils/Pop.js";
import { SocketHandler } from "@/utils/SocketHandler.js";

class AlbumHandler extends SocketHandler {
  constructor() {
    super()
    this.on('CREATED_ALBUM', this.onCreatedAlbum)
  }

  onCreatedAlbum() {
    Pop.toast('Someone created an album!')
  }
}

export const albumHandler = new AlbumHandler()