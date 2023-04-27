<template>
  <Transition name="popup-transition">
    <aside class="popup" v-if="showReview">
      <div class="card bg-red-d white">
        <h2>{{ targetShop.name }}</h2>
        <p>{{ targetShop.city }} ({{ targetShop.departement }})</p>
        
        <form class="sm-card bg-white red-m" @submit.prevent="handleSendReview($event)">
          <div class="star-container">
            <h3>Pâte</h3>
            <div class="star-wrapper">
              <span class="star" v-for="star, i in notes.pate" :key="star.id">
                <div @click="handleSetNote('pate', i)">
                  <StarFullIcon v-if="star"/>
                  <StarEmptyIcon v-else/>
                </div>
              </span>
            </div>
          </div>

          <div class="star-container">
            <h3>Texture</h3>
            <div class="star-wrapper">
              <span class="star" v-for="star, i in notes.texture" :key="star.id">
                <div @click="handleSetNote('texture', i)">
                  <StarFullIcon v-if="star"/>
                  <StarEmptyIcon v-else/>
                </div>
              </span>
            </div>
          </div>

          <div class="star-container">
            <h3>Goût</h3>
            <div class="star-wrapper">
              <span class="star" v-for="star, i in notes.gout" :key="star.id">
                <div @click="handleSetNote('gout', i)">
                  <StarFullIcon v-if="star"/>
                  <StarEmptyIcon v-else/>
                </div>
              </span>
            </div>
          </div>

          <div class="button-wrapper">
            <button @click.prevent="toggleReviewPopup">Annuler</button>
            <button>Valider</button>
          </div>
        </form>
      </div>
    </aside>
  </Transition>
</template>

<script setup>
import StarFullIcon from '~/components/icons/StarFullIcon.vue'
import StarEmptyIcon from '~/components/icons/StarEmptyIcon.vue'

const { showReview, toggleReviewPopup } = usePopup()
const { user, sendReview } = useUser()
const { targetShop } = useShop()

const notes = ref({
  pate: Array(5).fill(false),
  texture: Array(5).fill(false),
  gout: Array(5).fill(false)
})

function handleSetNote(type, note) {
  notes.value[type] = notes.value[type].reduce((acc, val, i) => [...acc, note > i - 1], [])
}

async function handleSendReview() {
  await sendReview({
    text: "",
    notes: [
      { noteTypeId: 1, amount: notes.value.pate.filter((el) => el).length },
      { noteTypeId: 2, amount: notes.value.texture.filter((el) => el).length },
      { noteTypeId: 3, amount: notes.value.gout.filter((el) => el).length },
    ]
  })
  
  toggleReviewPopup()
}
</script>

<style scoped>
h2 {
  letter-spacing: 0;
}
.star-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 80%;
}
.star-container > *:first-child {
  text-align: right;
  width: 25%;
  margin-right: .5rem;
}
.star-container > *:last-child {
  width: 75%;
  display: flex;
}

.star .icon{
  cursor: pointer;
  height: 2rem;
  width: 2rem;
}

</style>