<template>
  <NuxtLayout name="home">

    <section class="first">
      <h1 class="sm-card bg-white red-m">
        <span>
          En quête
        </span>
        <span>
          du flan parfait
        </span>
      </h1>

      <img id='home-img' src="@/assets/img/home-img.jpg"
        alt="Image vectorielle représentant l'intérieur d'une boulangerie">
    </section>


    <section class="bg-red-m" data-user="true">
      <div class="left">
        <h1 class="sm-card bg-white blob-1">
          <span id="userNumber" class="red-m big-font">0</span>
          <span class="red-m">passionnés</span>
        </h1>
      </div>

      <div class="right">
        <p>Regoignez la communauté</p>
        <p>et partagez vos trouvailles</p>
      </div>
    </section>

    <section class="bg-red-d" data-shop="true">
      <div class="left">
        <p>Trouvez la pépite</p>
        <p>partout en France</p>
      </div>

      <div class="right">
        <h1 class="sm-card bg-white blob-2">
          <span id="shopNumber" class="red-d big-font">0</span>
          <span class="red-d">références</span>
        </h1>
      </div>
    </section>

    <section class="bg-red-m">
      <div class="left">
        <h1 class="sm-card bg-white blob-3">
          <span class="red-m">C'est parti !</span>
        </h1>
      </div>

      <div class="right">
        <p>Rien de plus simple</p>
        <p>vous n'avez besoin</p>
        <p>que de vous inscrire !</p>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup>

useHead({
  title: 'Flan - Home',
  meta: [
    { name: 'description', content: 'Rejoignez la communauté en recherche du flan parfait !' }
  ],
})

useSeoMeta({
  title: 'Flan - Home',
  ogTitle: 'Flan - Home',
  description: 'Utilisez la carte interactive pour localiser les meilleurs flans pâtissiers.',
  ogDescription: 'Utilisez la carte interactive pour localiser les meilleurs flans pâtissiers.',
  twitterCard: 'summary_large_image'
})


const users = ref(0)
const shops = ref(0)
const prevRatio = ref(0)


onMounted(async () => {
  createObserver()

  const res = await api.get('/home')
  users.value = res.users
  shops.value = res.shops
})

// Intersection Observer

function buildThresholdList(numSteps) {
  const thresholds = []

  for (let i = 1; i <= numSteps; i++) {
    const ratio = i / numSteps
    thresholds.push(ratio)
  }

  thresholds.push(0)
  return thresholds
}

async function animateNumber(ref, total) {
  let delay = 200
  let delays = []
  const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  for (let i = 0; i < total; i++) {
    delay /= 1.05
    delays.unshift(delay)
  }

  if (total > 10000) {
    for (let j = 0; j < total; j += 50) {
      await timeout(delays.at(j)).then(() => ref.innerText = j)
    }
    ref.innerText = total
  }

  else {
    for (let j = 0; j < total; j++) {
      await timeout(delays.at(j)).then(() => ref.innerText = j)
    }
  }
}

function createObserver() {
  const observer = new IntersectionObserver(
    async (entries, observer) => {
      entries.forEach((entry) => {
        prevRatio.value = entry.intersectionRatio

        if (entry.intersectionRatio > .3 && !entry.target.dataset.animated) {
          entry.target.dataset.animated = true
          entry.target.classList.add('animated')

          if (entry.target.dataset.user)
            animateNumber(document.getElementById('userNumber'), users.value)

          if (entry.target.dataset.shop)
            animateNumber(document.getElementById('shopNumber'), shops.value)
        }
      })
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: buildThresholdList(10)
    }
  )

  observer.observe(document.querySelector('.home section:nth-child(' + 2 + ')'))
  observer.observe(document.querySelector('.home section:nth-child(' + 3 + ')'))
  observer.observe(document.querySelector('.home section:nth-child(' + 4 + ')'))
}
</script>