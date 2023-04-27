<template>
  <NuxtLayout name="app" class="page-map">
    <template #title>
      Trouver le flan parfait
    </template>
    
    <template #left>
      <div class="search-wrapper">
        <div class="sm-card bg-red-m white search-city-card">
          <h2>Chercher une ville</h2>
          <div class="input-wrapper">
            <input type="text" v-model="searchCityInput" @input="searchCity"/>
            <CrossIcon @click="resetSearchCity"/>
          </div>
          <div class="results-container" v-if="searchCityResults.length">
            <div v-if="searchCityInput.length && !searchCityResults.length">
              <p class="sm-card bg-white red-m">Aucun résultats</p>
            </div>

            <div v-else v-for="result in searchCityResults" :key="result.id">
              <p @click="selectCity(result)" class="sm-card bg-white red-m">
                {{ result.nom }} - {{ result.codeDepartement }}
              </p>
            </div>
          </div>
        </div>
        
        <div class="sm-card bg-red-m white search-shop-card">
          <h2>Chercher une boulangerie</h2>

          <div class="input-wrapper">
            <input type="text" v-model="searchShopInput" @input="searchShop"/>
            <CrossIcon @click="resetSearchShop"/>
          </div>
          <div class="results-container" v-if="searchShopInput && searchShopResults && searchShopResults.results">
            <div v-if="!searchShopResults.total">
              <p class="sm-card bg-white red-m">Aucun résultats</p>
            </div>

            <div v-else v-for="result in searchShopResults.results" :key="result.id">
              <p @click="selectShop(result)" class="sm-card bg-white red-m shop-result">
                {{ result.name }}
                <span>{{ result.city }} ({{ result.departement }})</span>
              </p>
            </div>

            <div class="button-container" v-if="searchShopResults.results.length">
              <button @click="shopPrevPage" :disabled="searchShopPage === 1"><ChevronIcon/></button>
              <p class="red-m">{{searchShopPage}} / {{ searchShopResults.pages }}</p>
              <button @click="shopNextPage" :disabled="searchShopPage === searchShopResults.pages"><ChevronIcon /></button>
            </div>
          </div>
        </div>
      </div>

      <div class="map-container">
        <LeafletMap :isEditing="false"/>
      </div>
    </template>

    <template #right>
      <div class="card bg-white red-m empty-shop-card" v-if="!targetShop">
        <div class="legend">
          Sélectionnez une boulangerie sur la carte
        </div>
        <div class="legend-infos">
          <p>
            <TropheeMapIcon class="gold"/>
            Le flan n°1
          </p>
          <p>
            <TropheeMapIcon class="silver"/>
            Le flan n°2
          </p>
          <p>
            <TropheeMapIcon class="bronze"/>
            Le flan n°3
          </p>
        </div>
      </div>

      <div class="card bg-red-m white shop-card" v-else>
        <h3>{{ targetShop.name }}</h3>
        <h3>à {{ targetShop.city }} ({{ targetShop.departement }})</h3>
        <p>{{ targetShop.reviews.length }} avis sur ce flan</p>
        <div class="review-container card bg-white red-m" :class="{'noted': hasAlreadyNoted}">
          <ul v-for="review in targetShop.reviews" :key="review.id" class="sm-card bg-red-m white">
            <div class="review-header">
              <h3>{{ review.user.lastName.toUpperCase() }} {{ review.user.firstName }}</h3>
              <p>{{ new Date(review.createdAt).toLocaleDateString() }}</p>
            </div>

            <div class="note-wrapper">
              <li v-for="note in review.notes" :key="note.id">
                <StarHolder :note="note"/>
              </li>
            </div>
          </ul>
        </div>

        <div class="button-wrapper" v-if="!hasAlreadyNoted">
          <button @click="toggleReviewPopup">Noter</button>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>
import CrossIcon from '~/components/icons/CrossIcon.vue'
import ChevronIcon from '../components/icons/ChevronIcon.vue'
import TropheeMapIcon from '../components/icons/TropheeMapIcon.vue'

useSeoMeta({
  title: 'Flan - Carte',
  ogTitle: 'Flan - Carte',
  description: 'Utilisez la carte interactive pour localiser les meilleurs flans pâtissiers.',
  ogDescription: 'Utilisez la carte interactive pour localiser les meilleurs flans pâtissiers.',
  twitterCard: 'summary_large_image'
})

const { user } = useUser()
const { targetShop } = useShop()
const { toggleReviewPopup } = usePopup()

const {
  searchCityInput, searchCityResults, searchCity, selectCity, resetSearchCity,
  searchShopInput, searchShopResults, searchShop, selectShop, resetSearchShop, searchShopPage, shopPrevPage, shopNextPage,
  isEditing, newMarkerName
} = useMap()


const hasAlreadyNoted = computed(() => {
  return user.value && user.value.reviews && user.value.reviews.find((review) => review.shop.id === targetShop.value.id)
    ? true
    : false
})
</script>