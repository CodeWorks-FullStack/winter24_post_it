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
          <div>
            <img :src="album.creator.picture" :alt="album.creator.name">
            <span class="ms-3">{{ album.creator.name }}</span>
          </div>
        </div>
        <div>
          <!-- TODO display watcher count when backend supports it -->
          <b>0</b> <i class="mdi mdi-account-multiple"></i>
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

.glass-card {
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.742);
  backdrop-filter: blur(10px);
}

img {
  height: 2rem;
  border-radius: 50%;
  aspect-ratio: 1/1;
  object-fit: cover;
}
</style>