<script setup>
import { picturesService } from '@/services/PicturesService.js';
import {uploadsService} from '@/services/UploadsService.js'
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { Modal } from 'bootstrap';
import { ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()

const editablePictureData = ref({
  imgUrl: '',
  albumId: ''
})

const previewImageUrl = ref('')
let fileToUpload = null

async function createPicture() {
  try {
    // @ts-ignore
    editablePictureData.value.albumId = route.params.albumId
    const url = await uploadsService.uploadImage(fileToUpload)
    editablePictureData.value.imgUrl = url

    await picturesService.createPicture(editablePictureData.value)

    editablePictureData.value = {
      imgUrl: '',
      albumId: ''
    }
    previewImageUrl.value = ''
    fileToUpload = null

    document.getElementById('picture-form').reset() // clear the form

    Modal.getInstance('#pictureModal').hide()
  } catch (error) {
    Pop.meow(error)
    logger.error('[CREATING PICTURE]', error)
  }
}

function handleFileSelect(event){
  const imageFile = event.target.files[0]
  logger.log('📁', imageFile)
  const preview = URL.createObjectURL(imageFile)
  previewImageUrl.value = preview
  fileToUpload = imageFile
}
</script>


<template>
  <form id="picture-form" @submit.prevent="createPicture()">
    <div v-if="previewImageUrl" class="mb-3">
      <img :src="previewImageUrl" alt="Your picture" class="w-100">
      <p>Image preview</p>
    </div>
    <div class="form-floating mb-3">
      <input @change="handleFileSelect" type="file" class="form-control" id="imgUrl"
        placeholder="Picture ImgUrl" required maxlength="2000">
      <label for="imgUrl">Picture ImgUrl</label>
    </div>
    <div class="text-end">
      <button class="btn btn-success">
        Submit
      </button>
    </div>
  </form>
</template>


<style lang="scss" scoped></style>