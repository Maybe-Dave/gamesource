<template>
  <div class="text-center m3" v-if="loading">
    <v-progress-circular 
    indeterminate
    color="primary"
    />
  </div>
  <div v-else>
    <Header />
    <RouterView />
  </div>
</template>

<script setup>
import Header from './components/navigation/Header.vue';
import { firstLoad } from './composables/auth';


const {loading} = firstLoad();

</script>