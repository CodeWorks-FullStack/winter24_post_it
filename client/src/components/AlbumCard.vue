<script setup>
import { Album } from '@/models/Album.js';

defineProps({
  album: { type: Album, required: true }
})
</script>


<template>
  <router-link :to="{ name: 'Album Details', params: { albumId: album.id } }">
    <div class="cover-img p-2 d-flex flex-column justify-content-end"
      :style="{ backgroundImage: `url(${album.coverImg})` }">
      <div class="glass-card text-light p-3 d-flex justify-content-between align-items-center">
        <!-- TODO get random color -->
        <div>
          <span class="mb-1"><b>{{ album.title }}</b></span>
          <!-- NOTE stops component from breaking if album do not have creator populated -->
          <!-- TODO show how to fix this on the server -->
          <div v-if="album.creator">
            <img :src="album.creator.picture" :alt="album.creator.name" class="creator-img">
            <span class="ms-3">{{ album.creator.name }}</span>
          </div>
        </div>
        <div>
          <b>{{ album.watcherCount }}</b> <i class="mdi mdi-account-multiple"></i>
        </div>
      </div>
    </div>
  </router-link>
</template>


<style lang="scss" scoped>
.cover-img {
  min-height: 30dvh;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
}



img {
  height: 2rem;
}
</style>