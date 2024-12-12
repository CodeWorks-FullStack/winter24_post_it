<script setup>
import { picturesService } from '@/services/PicturesService.js';
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

async function createPicture() {
  try {
    // @ts-ignore
    editablePictureData.value.albumId = route.params.albumId
    await picturesService.createPicture(editablePictureData.value)

    editablePictureData.value = {
      imgUrl: '',
      albumId: ''
    }

    Modal.getInstance('#pictureModal').hide()
  } catch (error) {
    Pop.meow(error)
    logger.error('[CREATING PICTURE]', error)
  }
}
</script>


<template>
  <form @submit.prevent="createPicture()">
    <div class="form-floating mb-3">
      <input v-model="editablePictureData.imgUrl" type="url" class="form-control" id="imgUrl"
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