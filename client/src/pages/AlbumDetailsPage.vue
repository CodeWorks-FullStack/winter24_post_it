<script setup>
import { AppState } from '@/AppState.js';
import ModalWrapper from '@/components/ModalWrapper.vue';
import PictureForm from '@/components/PictureForm.vue';
import { albumsService } from '@/services/AlbumsService.js';
import { picturesService } from '@/services/PicturesService.js';
import { watchersService } from '@/services/WatchersService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const album = computed(() => AppState.activeAlbum)
const account = computed(() => AppState.account)
const watcherProfiles = computed(() => AppState.watcherProfiles)
// NOTE some is an array method that will return true if your condition is ever met, and false if it is not
const isWatching = computed(() => watcherProfiles.value.some(watcherProfile => watcherProfile.accountId == account.value?.id))
const pictures = computed(() => AppState.pictures)

const route = useRoute()

watch(route, () => {
  getAlbumById()
  getWatcherProfilesByAlbumId()
  getPicturesByAlbumId()
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

async function createWatcher() {
  try {
    // NOTE the request body must be an object
    const albumData = { albumId: route.params.albumId }
    await watchersService.createWatcher(albumData)
  } catch (error) {
    Pop.meow(error)
    logger.error('[CREATING WATCHER]', error)
  }
}

async function getPicturesByAlbumId() {
  try {
    const albumId = route.params.albumId
    await picturesService.getPicturesByAlbumId(albumId)
  } catch (error) {
    Pop.meow(error)
    logger.error('[GETTING PICTURES]', error)
  }
}
</script>


<template>
  <div class="text-light">

    <!-- NOTE don't forget the v-if for potentially null data -->
    <div v-if="album" class="container">
      <!-- ANCHOR album hero -->
      <section class="row album-hero justify-content-center align-items-end"
        :style="{ backgroundImage: `url(${album.coverImg})` }">
        <div class="col-11 col-md-8">
          <div class="m-2 p-2 glass-card">
            <div class="mb-5">
              <div class="text-center">
                <b class="fs-3">
                  {{ album.title }}
                  <i v-if="album.archived" class="mdi mdi-alert text-warning"
                    :title="`${album.title} is archived and no longer accepting new pictures`"></i>
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
        <section class="col-md-4 p-md-0">
          <div class="d-flex">
            <div class="glass-card px-4 py-1 flex-grow-1">
              <b class="d-block">{{ watcherProfiles.length }}</b>
              <b>Watchers</b>
            </div>
            <div v-if="account">
              <button v-if="isWatching" class="btn btn-danger" disabled>
                <i class="d-block mdi mdi-heart"></i>
                Watching
              </button>
              <button v-else @click="createWatcher()" class="btn btn-info">
                <i class="d-block mdi mdi-account-plus"></i>
                Watch
              </button>
            </div>
          </div>
          <div class="row mt-3">
            <div v-for="watcherProfile in watcherProfiles" :key="watcherProfile.id" class="col-4 mb-3">
              <img :src="watcherProfile.profile.picture" :alt="watcherProfile.profile.name" class="img-fluid rounded"
                :title="watcherProfile.profile.name">
            </div>
          </div>
        </section>
        <!-- ANCHOR pictures section -->
        <section class="col-md-8">
          <div class="masonry-container">
            <div v-for="picture in pictures" :key="picture.id" class="mb-3">
              <img :src="picture.imgUrl" :alt="'A picture posted by ' + picture.creator.name"
                class="picture-img rounded">
              <b>posted by {{ picture.creator.name }}</b>
            </div>
          </div>
        </section>
      </div>
      <button v-if="account" :disabled="album.archived" data-bs-toggle="modal" data-bs-target="#pictureModal"
        class="btn btn-success rounded-pill picture-button m-2">
        Create Picture <i class="mdi mdi-plus-box"></i>
      </button>
    </div>
    <div v-else class="container">
      <section class="row">
        <div class="col-12">
          <h2 class="text-center">Loading... <i class="mdi mdi-loading mdi-spin"></i></h2>
        </div>
      </section>
    </div>
  </div>
  <ModalWrapper modalId="pictureModal" modalTitle="Create Picture">
    <PictureForm />
  </ModalWrapper>
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

.picture-img {
  width: 100%
}

.picture-button {
  position: fixed;
  right: 0;
  bottom: 0;
}

.masonry-container {
  columns: 200px;

  >* {
    break-inside: avoid;
    display: inline-block
  }
}

b {
  text-shadow: 1px 1px black
}
</style>