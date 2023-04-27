<template>
  <Transition name="popup-transition">
    <aside class="popup" v-if="showDeleteUser">
      <div class="card bg-red-d white">
        <h2>Souhaitez vous vraiment supprimer votre compte ?</h2>
        <p>Attention : cette action est irréversible</p>
        
        <form class="sm-card bg-white red-m" @submit.prevent="handleDeleteUser($event)">
          <input type="text" name="lastName" placeholder="Mot de passe"/>

          <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>

          <div class="button-wrapper">
            <button @click.prevent="toggleDeleteUserPopup">Annuler</button>
            <button>Supprimer</button>
          </div>
        </form>
      </div>
    </aside>
  </Transition>
</template>

<script setup>
const { showDeleteUser, toggleDeleteUserPopup } = usePopup()
const { deleteUser } = useUser()
const errorMsg = ref("")

async function handleDeleteUser(e) {
  try {
    errorMsg.value = ""
    const form = new FormData(e.target)
    await deleteUser({
      password: form.get('password')
    })
    toggleDeleteUserPopup()
  }
  catch(err) {
    errorMsg.value = err
  }
}
</script>