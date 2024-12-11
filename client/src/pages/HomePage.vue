<script setup>
import { AppState } from '@/AppState.js';
import AlbumCard from '@/components/AlbumCard.vue';
import { albumsService } from '@/services/AlbumsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted, ref } from 'vue';

const albums = computed(() => {
  if (activeFilterCategory.value == 'all') return AppState.albums
  return AppState.albums.filter(album => album.category == activeFilterCategory.value)
})

const activeFilterCategory = ref('all')

const categories = [
  {
    name: 'all',
    imgUrl: 'https://images.unsplash.com/photo-1528818955841-a7f1425131b5?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3RhcnJ5JTIwc2t5fGVufDB8fDB8fHwy'
  },
  {
    name: 'aesthetics',
    imgUrl: 'https://images.unsplash.com/photo-1671372954216-a1ed945642cd?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnVqaXxlbnwwfHwwfHx8Mg%3D%3D'
  },
  {
    name: 'food',
    imgUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnVyZ2VyfGVufDB8fDB8fHwy'
  },
  {
    name: 'games',
    imgUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXJjYWRlfGVufDB8fDB8fHwy'
  },
  {
    name: 'animals',
    imgUrl: 'https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhdHN8ZW58MHx8MHx8fDI%3D'
  },
  {
    name: 'vibes',
    imgUrl: 'https://images.unsplash.com/photo-1520014321782-49b0fe958b59?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3RyZWV0d2VhcnxlbnwwfHwwfHx8Mg%3D%3D'
  },
  {
    name: 'misc',
    imgUrl: 'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWJzdHJhY3R8ZW58MHx8MHx8fDI%3D'
  },
]

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
  <div class="container text-light">
    <section class="row mt-4">
      <div class="col-12 mb-3">
        <div class="border-bottom border-primary border-1">
          <h2>Find Your Interest</h2>
        </div>
      </div>
      <div v-for="category in categories" :key="'filter-' + category.name" class="col-6 col-md-3">
        <div @click="activeFilterCategory = category.name" role="button"
          :style="{ backgroundImage: `url(${category.imgUrl})` }" class="text-center py-4 mb-3 rounded filter-button">
          <span class="text-capitalize">
            <b>{{ category.name }}</b>
          </span>
        </div>
      </div>
    </section>
    <section class="row">
      <div class="col-12 mb-3">
        <div class="border-bottom border-primary border-1">
          <h2 class="text-capitalize">{{ activeFilterCategory }} Albums</h2>
        </div>
      </div>
      <div v-for="album in albums" :key="album.id" class="col-md-4 mb-3">
        <AlbumCard :album="album" />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.filter-button {
  background-size: cover;
  background-position: center;

  b {
    text-shadow: 1px 1px 2px black;
  }
}

h2 {
  text-shadow: 1px 1px 2px black;

}
</style>
