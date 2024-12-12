<script setup>
import Navbar from './components/Navbar.vue';
import { AppState } from './AppState.js';
import ModalWrapper from './components/ModalWrapper.vue';
import AlbumForm from './components/AlbumForm.vue';

</script>

<template>
  <header>
    <Navbar />
  </header>
  <main class="position-relative">
    <router-view />
  </main>
  <footer class="bg-dark text-light">
    Made with 🐈‍⬛🐈‍⬛🐈‍⬛🐈🐈🐈 by Jeremy
  </footer>

  <ModalWrapper modalId="albumModal" modalTitle="Create Album">
    <AlbumForm />
  </ModalWrapper>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';

:root {
  --main-height: calc(100vh - 32px - 64px);
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
