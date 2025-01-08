import { AppState } from "@/AppState.js";
import { Picture } from "@/models/Picture.js";
import Pop from "@/utils/Pop.js";
import { SocketHandler } from "@/utils/SocketHandler.js";

class PictureHandler extends SocketHandler {
  constructor() {
    super()
    this
      .on('CREATED_PICTURE', this.onCreatedPicture)
      .on('PICTURE_CREATED_FOR_USER_ALBUM', this.onCreatedPictureForMyAlbum)
  }
  onCreatedPicture(payload) {
    const picture = new Picture(payload)
    AppState.pictures.push(picture)
  }

  onCreatedPictureForMyAlbum(payload) {
    const picture = new Picture(payload)
    Pop.toast(`${picture.creator.name} added a picture to ${picture.album.title}!`)
  }
}

export const pictureHandler = new PictureHandler()