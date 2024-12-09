<script setup>
import { AppState } from '@/AppState.js';
import { albumsService } from '@/services/AlbumsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const albums = computed(() => AppState.albums)

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
  <h1>Albums</h1>
  <div>{{ albums }}</div>
</template>

<style scoped lang="scss"></style>
