<script setup>
import { Album } from '@/models/Album.js';

defineProps({
  album: { type: Album, required: true }
})
</script>


<template>
  <p>Album Card</p>
</template>


<style lang="scss" scoped></style>