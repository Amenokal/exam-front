<template>
  <Transition name="popup-transition">
    <aside class="popup" v-if="showEditUser && user">
      <div class="card bg-red-d white">
        <h2>Modifier le profil</h2>
        
        <form class="sm-card bg-white red-m" @submit.prevent="handleUpdateUser($event)">
          <label for="lastName">Nom</label>
          <input type="text" name="lastName" :placeholder="user.lastName"/>
          <label for="firstName">Prénom</label>
          <input type="text" name="firstName" :placeholder="user.firstName"/>
          <label for="email">Email</label>
          <input type="text" name="email" :placeholder="user.email"/>
          <label for="password">Ancien mot de passe</label>
          <input type="text" name="password"/>
          <label for="newPassword">Nouveau mot de passe</label>
          <input type="text" name="newPassword"/>
          <label for="newPasswordConfirm">Confirmer nouveau mot de passe</label>
          <input type="text" name="newPasswordConfirm"/>

          <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>

          <div class="button-wrapper">
            <button @click.prevent="toggleEditUserPopup">Annuler</button>
            <button>Modifier</button>
          </div>
        </form>
      </div>
    </aside>
  </Transition>
</template>

<script setup>
const { showEditUser, toggleEditUserPopup } = usePopup()
const { user, updateUser } = useUser()
const errorMsg = ref("")

async function handleUpdateUser(e) {
  try {
    errorMsg.value = ""

    const form = new FormData(e.target)
    await updateUser({
      lastName: form.get('lastName'),
      firstName: form.get('firstName'),
      email: form.get('email'),
      password: form.get('password'),
      newPassword: form.get('newPassword'),
      newPasswordConfirm: form.get('newPasswordConfirm'),
    })
    toggleEditUserPopup()
  }
  catch(err) {
    errorMsg.value = err
  }
}
</script>