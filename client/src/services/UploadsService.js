import { api } from './AxiosService.js'


class UploadsService {

  async uploadImage(imageFile) {
    const uploadForm = new FormData()
    uploadForm.append('image', imageFile)
    const response = await api.post('api/upload', uploadForm)
    console.log('image uploaded', response.data)
    return response.data.url
  }

}

export const uploadsService = new UploadsService()