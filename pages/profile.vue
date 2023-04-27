<template>
  <NuxtLayout name="app" class="page-profile">
    <template #title>
      Mon compte
    </template>
    
    <template #left>
      <div class="card bg-red-m white user-infos" v-if="user">
        <h2>
          {{ user.lastName.toUpperCase() }} {{ user.firstName }}
          <span>{{ user.email }}</span>
        </h2>

        <div class="edit-wrapper">
          <EditUserIcon @click="toggleEditUserPopup"/>
          <DeleteUserIcon @click="toggleDeleteUserPopup"/>
        </div>
      </div>

      <div class="card bg-red-m white podium-infos">
        <h2 class="sm-card bg-white red-m">Mes préférés</h2>
        <div class="podium" v-if="shopPodium.length">
          <div class="col third">
            <div class="bar trophee-info" v-if="shopPodium.at(2)">
              <IconsTropheeIcon class="bronze">3</IconsTropheeIcon>
              <div class="t-i-data">
                <p class="red-m">{{ shopPodium.at(2).shop.name }}</p>
                <span class="red-m">{{ shopPodium.at(2).shop.city }} ({{ shopPodium.at(2).shop.departement }})</span>
                <span class="red-m">Note générale : {{ shopPodium.at(0).avgNote }}</span>
              </div>
            </div>
          </div>
          
          <div class="col first">
            <div class="bar trophee-info" v-if="shopPodium.at(0)">
              <IconsTropheeIcon class="gold">1</IconsTropheeIcon>
              <div class="t-i-data">
                <p class="red-m">{{ shopPodium.at(0).shop.name }}</p>
                <span class="red-m">{{ shopPodium.at(0).shop.city }} ({{ shopPodium.at(0).shop.departement }})</span>
                <span class="red-m">Note générale : {{ shopPodium.at(0).avgNote }}</span>
              </div>
            </div>
          </div>
          
          <div class="col second">
            <div class="bar trophee-info" v-if="shopPodium.at(1)">
              <IconsTropheeIcon class="silver">2</IconsTropheeIcon>
              <div class="t-i-data">
                <p class="red-m">{{ shopPodium.at(1).shop.name }}</p>
                <span class="red-m">{{ shopPodium.at(1).shop.city }} ({{ shopPodium.at(1).shop.departement }})</span>
                <span class="red-m">Note générale : {{ shopPodium.at(0).avgNote }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #right>
      <div class="card bg-red-m white">
        <h3 class="sm-card bg-white red-m">
          {{ user.reviews.length }} flan{{ user.reviews.length ? "s" : "" }} noté{{ user.reviews.length ? "s" : "" }}
        </h3>
        <div class="card bg-white review-wrapper">
          <div v-for="review in user.reviews.sort((a, b) => b.avgNote - a.avgNote)" :key="review.id" class="sm-card bg-red-m white review-container">
            <p class="review-header">
              {{ review.shop.name }}
              <span>{{ review.shop.city }} ({{ review.shop.departement }})</span>
            </p>
            <p>{{ new Date(review.createdAt).toLocaleDateString() }}</p>
            <p>Note personnelle: {{ personalAvg(review.notes) }}</p>
            <p>Note moyenne: {{ review.avgNote }}</p>
            <div class="note-wrapper">  
              <p v-for="note in review.notes" :key="note.id">
                <StarHolder :note="note" class="white"/>
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>
import EditUserIcon from '~/components/icons/EditUserIcon.vue'
import DeleteUserIcon from '~/components/icons/DeleteUserIcon.vue'

useSeoMeta({
  title: 'Flan - Mon profil',
  ogTitle: 'Flan - Mon profil',
  description: 'Modifiez votre profil et consultez vos revues laissées.',
  ogDescription: 'Modifiez votre profil et consultez vos revues laissées.',
  twitterCard: 'summary_large_image'
})

const { toggleEditUserPopup, toggleDeleteUserPopup } = usePopup()
const { user } = useUser()

const shopPodium = computed(() => user.value && user.value.reviews
  ? user.value.reviews
    .sort((a, b) => b.avgNote - a.avgNote)
    .slice(0, 3)
  : []
)

function personalAvg(notes) {
  if (!notes.length) return []

  else {
    const avg = notes.reduce((acc, val) => acc + val.amount, 0) / notes.length
    return avg.toFixed(1)
  }
}

</script>