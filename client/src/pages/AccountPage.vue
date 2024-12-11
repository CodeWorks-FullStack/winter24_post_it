<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '@/utils/Pop.js';
import { logger } from '@/utils/Logger.js';
import { watchersService } from '@/services/WatchersService.js';
import AlbumCard from '@/components/AlbumCard.vue';

const account = computed(() => AppState.account)
const watchedAlbums = computed(() => AppState.watchedAlbums)

onMounted(() => {
  getMyWatchedAlbums()
})

async function getMyWatchedAlbums() {
  try {
    await watchersService.getMyWatchedAlbums()
  } catch (error) {
    Pop.meow(error)
    logger.error('[GETTING MY WATCHED ALBUMS]', error)
  }
}

</script>

<template>
  <div class="text-light">
    <div v-if="account">
      <div class="container">
        <section class="row">
          <div class="col-12">
            <div class="text-center">
              <span>
                welcome back {{ account.name }} <img :src="account.picture" :alt="account.name"
                  class="creator-img ms-2">
              </span>
              <p class="mt-2">you are watching {{ watchedAlbums.length }} albums</p>
            </div>
          </div>
        </section>
        <section class="row">
          <div v-for="watchedAlbum in watchedAlbums" :key="watchedAlbum.id" class="col-md-4 mb-3">
            <AlbumCard :album="watchedAlbum.album" />
          </div>
        </section>
      </div>
    </div>
    <div v-else>
      <h1 class="text-center">Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
.creator-img {
  height: 4rem;
}
</style>
