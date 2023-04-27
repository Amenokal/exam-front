<template>
  <NuxtPage />
</template>

<script setup>
useHead({
  link: [{
    rel: "stylesheet",
    href: "https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
  }],
  script: [
    {src: "https://unpkg.com/leaflet@1.9.3/dist/leaflet.js", defer: true },
    {src: "https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js", defer: true },
  ]
})
</script>