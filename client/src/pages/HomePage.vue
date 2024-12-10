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
  <div class="container">
    <section class="row">
      <div class="col-12">
        <div class="text-primary">
          <h2>Find Your Interest</h2>

        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss"></style>
