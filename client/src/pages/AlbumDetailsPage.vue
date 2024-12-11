<script setup>
import { AppState } from '@/AppState.js';
import { albumsService } from '@/services/AlbumsService.js';
import { watchersService } from '@/services/WatchersService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const album = computed(() => AppState.activeAlbum)
const account = computed(() => AppState.account)

const route = useRoute()

watch(route, () => {
  getAlbumById()
  getWatcherProfilesByAlbumId()
}, { immediate: true })

async function getAlbumById() {
  try {
    const albumId = route.params.albumId
    await albumsService.getAlbumById(albumId)
  } catch (error) {
    Pop.meow(error)
    logger.error('[GETTING ALBUM BY ID]', error)
  }
}

async function archiveAlbum() {
  try {
    const yes = await Pop.confirm(`Are you sure that you want to ${album.value.archived ? 'unarchive' : 'archive'} the ${album.value.title} album?`, "It's a pretty cool album", "Yes I am sure!")

    if (!yes) return

    const albumId = route.params.albumId
    await albumsService.archiveAlbum(albumId)
  } catch (error) {
    Pop.meow(error)
    logger.error('[ARCHIVING ALBUM]', error)
  }
}

async function getWatcherProfilesByAlbumId() {
  try {
    const albumId = route.params.albumId
    await watchersService.getWatcherProfilesByAlbumId(albumId)
  } catch (error) {
    Pop.meow(error)
    logger.error('[GETTING WATCHER PROFILES]', error)
  }
}
</script>


<template>
  <div class="text-light">

    <!-- NOTE don't forget the v-if for potentially null data -->
    <div v-if="album" class="container">
      <section class="row album-hero justify-content-center align-items-end"
        :style="{ backgroundImage: `url(${album.coverImg})` }">
        <div class="col-8 ">
          <div class="m-2 p-2 glass-card">
            <div class="mb-5">
              <div class="text-center">
                <b class="fs-3">
                  {{ album.title }}
                  <i v-if="album.archived" class="mdi mdi-alert text-warning"
                    :title="`${album.title} is archived and no longer accpeting new pictures`"></i>
                </b>
              </div>
              <p class="mx-5">{{ album.description }}</p>
            </div>
            <div class="d-md-flex justify-content-between align-items-center">
              <div>
                <span class="bg-info rounded-pill px-3">{{ album.category }}</span>
                <span v-if="album.creatorId == account?.id" @click="archiveAlbum()"
                  class="bg-danger rounded-pill px-3 ms-2" role="button">
                  {{ album.archived ? 'Unarchive' : 'Archive' }} Album
                </span>
              </div>
              <div>
                <span>created by {{ album.creator.name }}</span>
                <img :src="album.creator.picture" :alt="album.creator.name" class="creator-img ms-3">
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="row mt-3">
        <!-- ANCHOR watcher section -->
        <section class="col-md-4 p-0">
          <div class="d-flex">
            <div class="glass-card p-1 flex-grow-1">
              <b class="d-block">0</b>
              <b>Watchers</b>
            </div>
            <button class="btn btn-info">
              <i class="d-block mdi mdi-account-plus"></i>
              Watch
            </button>
          </div>
        </section>
        <!-- ANCHOR pictures section -->
        <section class="col-md-8"></section>
      </div>
    </div>
    <div v-else class="container">
      <section class="row">
        <div class="col-12">
          <h2 class="text-center">Loading... <i class="mdi mdi-loading mdi-spin"></i></h2>
        </div>
      </section>
    </div>
  </div>

</template>


<style lang="scss" scoped>
.album-hero {
  min-height: 50dvh;
  background-size: cover;
  background-position: center;
  border-radius: 15px;
}

.creator-img {
  height: 3rem;
}
</style>