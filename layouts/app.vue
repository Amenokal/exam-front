<template>
  <div class="app-container app-layout">
    <div class="bg-body-img"><img src="@/assets/img/app-bg-2.png" alt="Couleurs du fond d'écran de l'application"/></div>

    <div class="header-wrapper bg-red-m" v-if="user">
      <header :class="{'blurred': blurMain}">
        <div>
          <NuxtLink class="hide" to="/profile" title="Lien vers la page Mon compte"><UserIcon/></NuxtLink>
          <NuxtLink class="hide" to="/map" title="Lien vers la page Carte Intéractive"><MapIcon/></NuxtLink>
        </div>
        <div class="bottom-header">
          <NuxtLink class="hide" to="/" @click="logout" title="Se déconnecter"><LogoutIcon/></NuxtLink>
        </div>
      </header>
    </div>

    <Transition name="fade" mode="out-in">
      <main v-if="!user">
        <LoadingSpinner/>
      </main>

      <main v-else :class="{'blurred': blurMain}">
        <div class="main-header">
          <h1>
            <slot name="title"/>
          </h1>
        </div>
          
        <div class="content-container">
          <section class="left">
            <slot name="left"/>
          </section>
          
          <section class="right">
            <slot name="right"/>
          </section>
        </div>
      </main>
    </Transition>

    <ReviewPopup/>
    <EditUserPopup />
    <DeleteUserPopup />
  </div>
</template>

<script setup>
import ReviewPopup from '~/components/popups/ReviewPopup.vue'
import EditUserPopup from '~/components/popups/EditUserPopup.vue'
import DeleteUserPopup from '~/components/popups/DeleteUserPopup.vue'
import LogoutIcon from '@/components/icons/LogoutIcon.vue'
import UserIcon from '@/components/icons/UserIcon.vue'
import MapIcon from '@/components/icons/MapIcon.vue'
import HeaderTrophy from '~/components/icons/HeaderTrophy.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const { blurMain } = usePopup()
const { user, getCurrentUser } = useUser()
const { logout } = useAuth()

onMounted(async () => {
  await getCurrentUser()

  const { animApp } = useAnimation()

  if(animApp.value) {
    const header = document.querySelector('header')
    header.classList.add('showLeft')

    const icons = document.querySelectorAll('a')
    icons.forEach((el) => el.classList.add('pop'))

    animApp.value = false
  }
})
</script>