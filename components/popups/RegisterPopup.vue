<template>
  <Transition name="popup-transition">
    <aside class="popup" v-if="showRegister">
      <div class="card bg-red-d white">
        <h2>Inscription</h2>
        
        <form class="sm-card bg-white red-m" @submit.prevent="handleCreateUser($event)">
          <label for="lastName">Nom</label>
          <input type="text" name="lastName"/>
          <label for="firstName">Prénom</label>
          <input type="text" name="firstName"/>
          <label for="email">Email</label>
          <input type="text" name="email"/>
          <label for="password">Mot de passe</label>
          <input type="text" name="password"/>
          <label for="passwordConfirm">Confirmez mot de passe</label>
          <input type="text" name="passwordConfirm"/>

          <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>

          <div class="button-wrapper">
            <button @click.prevent="toggleRegisterPopup">Annuler</button>
            <button>Valider</button>
          </div>
        </form>
      </div>
    </aside>
  </Transition>
</template>

<script setup>
const { showRegister, toggleRegisterPopup } = usePopup()
const { createUser } = useUser()
const router = useRouter()

const errorMsg = ref("")

async function handleCreateUser(e) {
  try {
    errorMsg.value = ""
    const form = new FormData(e.target)
    await createUser({
      lastName: form.get('lastName'),
      firstName: form.get('firstName'),
      email: form.get('email'),
      password: form.get('password'),
      passwordConfirm: form.get('passwordConfirm'),
    })
    toggleRegisterPopup()
    router.push('/map')
  }
  catch(err) {
    errorMsg.value = err
  }
}
</script>