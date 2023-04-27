<template>
  <div class="error-container">
    <h1 class="big-font">{{ error.statusCode }}</h1>
    
    <pre>{{ error.message }}</pre>

    <button @click="handleBack">Retour</button>
  </div>
</template>

<script setup>
defineProps({error: Object})
function handleBack() {
  const router = useRouter()
  router.back()
}
</script>

<style scoped>
.error-container {
  padding: 3rem;
}

h1 {
  font-size: 10rem;
}
</style>