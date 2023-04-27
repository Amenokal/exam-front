<template>
  <div class="star-container" v-if="note">
    <p>{{ note.noteType.name }}</p>
    <span class="star" v-for="star in stars" :key="star.id">
      <StarFullIcon v-if="star"/>
      <StarEmptyIcon v-else/>
    </span>
  </div>
</template>

<script setup>
import StarFullIcon from '~/components/icons/StarFullIcon.vue'
import StarEmptyIcon from '~/components/icons/StarEmptyIcon.vue'

const props = defineProps({ note: Object })

const stars = computed(() => {
  const arr = []
  for(let i=0; i<5; i++) {
    arr.push(i < props.note.amount)
  }
  return arr
})
</script>

<style scoped>
.icon { color: red; }
</style>
