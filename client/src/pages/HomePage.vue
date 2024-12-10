<script setup>
import { AppState } from '@/AppState.js';
import AlbumCard from '@/components/AlbumCard.vue';
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
    <section class="row my-4">
      <div class="col-12">
        <div class="text-light border-bottom border-primary border-1">
          <h2>Find Your Interest</h2>

        </div>
      </div>
    </section>
    <section class="row">
      <div class="col-12 mb-3">
        <div class="text-light border-bottom border-primary border-1">
          <h2>Popular Albums</h2>
        </div>
      </div>
      <div v-for="album in albums" :key="album.id" class="col-md-4 mb-3">
        <AlbumCard :album="album" />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss"></style>
