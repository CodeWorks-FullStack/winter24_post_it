<script setup>
import { albumsService } from '@/services/AlbumsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

onMounted(() => {
  getAlbumById()
})

async function getAlbumById() {
  try {
    const albumId = route.params.albumId
    await albumsService.getAlbumById(albumId)
  } catch (error) {
    Pop.meow(error)
    logger.error('[GETTING ALBUM BY ID]', error)
  }
}
</script>


<template>
  <h1>Album Details Page</h1>
</template>


<style lang="scss" scoped></style>