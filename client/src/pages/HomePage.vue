<script setup>
import { albumsService } from '@/services/AlbumsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { onMounted } from 'vue';

onMounted(() => {
  getAlbums()
})

async function getAlbums() {
  try {
    await albumsService.getAlbums()
  } catch (error) {
    Pop.meow(error)
    logger.error('[GETTING ALBUMS]', error)
  }
}
</script>

<template>
  <h1>Projects</h1>
</template>

<style scoped lang="scss"></style>
