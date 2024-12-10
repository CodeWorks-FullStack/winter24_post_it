<script setup>
import { albumsService } from '@/services/AlbumsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { Modal } from 'bootstrap';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const categories = ['aesthetics', 'food', 'games', 'animals', 'vibes', 'misc']

const editableAlbumData = ref({
  title: '',
  description: '',
  coverImg: '',
  category: ''
})

// NOTE router allows us to change route information
const router = useRouter()

async function createAlbum() {
  try {
    if (editableAlbumData.value.description == '') {
      delete editableAlbumData.value.description
    }

    // NOTE service returns the newly created album
    const album = await albumsService.createAlbum(editableAlbumData.value)

    // clears form
    editableAlbumData.value = {
      title: '',
      description: '',
      coverImg: '',
      category: ''
    }

    // close the modal
    Modal.getInstance('#albumModal').hide()

    // navigates to the album details page for newly created album
    router.push({ name: 'Album Details', params: { albumId: album.id } })
  } catch (error) {
    Pop.meow(error)
    logger.error('[CREATING ALBUM]', error)
  }
}
</script>


<template>
  <!-- NOTE make sure your form validation matches your schema validation -->
  <form @submit.prevent="createAlbum()">
    <div class="form-floating mb-3">
      <input v-model="editableAlbumData.title" type="text" class="form-control" id="title" placeholder="Album Title..."
        required minlength="3" maxlength="25">
      <label for="title">Album Title</label>
    </div>
    <div class="form-floating mb-3">
      <textarea v-model="editableAlbumData.description" class="form-control" placeholder="Album Description..."
        id="description" minlength="15" maxlength="250"></textarea>
      <label for="description">Album Description</label>
    </div>
    <div class="form-floating mb-3">
      <input v-model="editableAlbumData.coverImg" type="url" class="form-control" id="coverImg"
        placeholder="Album CoverImg..." required maxlength="2000">
      <label for="coverImg">Album CoverImg</label>
    </div>
    <div class="form-floating mb-3">
      <select v-model="editableAlbumData.category" class="form-select text-capitalize" id="category"
        aria-label="Album Category" required>
        <option selected value="" disabled>Choose a category</option>
        <option v-for="category in categories" :key="category" :value="category" class="text-capitalize">
          {{ category }}
        </option>
      </select>
      <label for="category">Album Category</label>
    </div>
    <div class="text-end">
      <button class="btn btn-success" type="submit">Submit</button>
    </div>
  </form>
</template>


<style lang="scss" scoped></style>