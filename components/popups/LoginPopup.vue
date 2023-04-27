<template>
  <Transition name="popup-transition">
    <aside class="popup" v-if="showLogin">
      <div class="card bg-red-d white">
        <h2>Connexion</h2>

        <form class="sm-card bg-white red-m" @submit.prevent="handleLogin($event)">
          <label for="email">Email</label>
          <input type="text" name="email"/>
          <label for="password">Mot de passe</label>
          <input type="text" name="password"/>
          <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
          <div class="button-wrapper">
            <button @click.prevent="toggleLoginPopup">Annuler</button>
            <button>Se connecter</button>
          </div>
        </form>
      </div>
    </aside>
  </Transition>
</template>

<script setup>
const { showLogin, toggleLoginPopup } = usePopup()
const { login } = useAuth()
const router = useRouter()

const errorMsg = ref("")

async function handleLogin(e) {
  try {
    errorMsg.value = ""
    const form = new FormData(e.target)
    await login({
      email: form.get('email'),
      password: form.get('password'),
    })
    toggleLoginPopup()
    router.push('/map')
  }
  catch(err) {
    errorMsg.value = err
  }
}
</script>