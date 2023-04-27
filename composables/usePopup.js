import { ref } from 'vue'

const showRegister = ref(false)
const showLogin = ref(false)
const showReview = ref(false)
const showEditUser = ref(false)
const showDeleteUser = ref(false)

const blurMain = computed(() => {
  return showRegister.value ||
    showLogin.value ||
    showReview.value ||
    showEditUser.value ||
    showDeleteUser.value
})

const usePopup = () => {
  function toggleRegisterPopup() {
    showRegister.value = !showRegister.value
  }
  
  function toggleLoginPopup() {
    showLogin.value = !showLogin.value
  }

  function toggleReviewPopup() {
    showReview.value = !showReview.value
  }

  function toggleEditUserPopup() {
    showEditUser.value = !showEditUser.value
  }

  function toggleDeleteUserPopup() {
    showDeleteUser.value = !showDeleteUser.value
  }

  return {
    blurMain,
    showRegister, toggleRegisterPopup,
    showLogin, toggleLoginPopup,
    showReview, toggleReviewPopup,
    showEditUser, toggleEditUserPopup,
    showDeleteUser, toggleDeleteUserPopup,
  }
}

export default usePopup