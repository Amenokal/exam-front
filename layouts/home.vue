<template>
  <div class="app-container home">
    <div class="bg-body-img"><img src="@/assets/img/magicpattern-mesh-gradient-1682428777849.png" alt="Couleurs du fond d'écran de la page d'accueil"/></div>
      
    <main :class="{'blurred': blurMain}">
      <slot/>
    </main>

    <div class="user-banner" :class="{'blurred': blurMain}">
      <div class="button-container" v-if="!user">
        <button @click="toggleLoginPopup">Connexion</button>
        <button @click="toggleRegisterPopup">Inscription</button>
      </div>
      <div class="button-container" v-else>
        <button @click="logout">Déconnexion</button>
      </div>
    </div>

    <LoginPopup/>
    <RegisterPopup/>
  </div>
</template>

<script setup>
import LoginPopup from '@/components/popups/LoginPopup.vue'
import RegisterPopup from '@/components/popups/RegisterPopup.vue'

const { user } = useUser()
const { logout } = useAuth()
const { animApp } = useAnimation()
const { blurMain, toggleLoginPopup, toggleRegisterPopup } = usePopup()

onMounted(() => {
  if(!animApp.value) animApp.value = true
})

</script>
