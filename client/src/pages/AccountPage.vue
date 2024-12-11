<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '@/utils/Pop.js';
import { logger } from '@/utils/Logger.js';
import { watchersService } from '@/services/WatchersService.js';

const account = computed(() => AppState.account)

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
            </div>
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
