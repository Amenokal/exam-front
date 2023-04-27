import { ref } from 'vue'

const user = ref(null)

const useUser = () => {
  
  async function createUser(data) {
    const res = await api.post('/register', data)
    return res.data
  }
  
  async function getAllUsers() {
    const res = await api.get('/users/')
    return res.sort((a, b) => b.reviews.length - a.reviews.length)
  }

  async function getCurrentUser() {
    if(user.value) return 

    const res = await api.get('/users/current/details')
    user.value = res

    const res2 = await api.get('/reviews/' + res.id)
    user.value.reviews = res2.map((el) => ({...el.review, avgNote: el.avgNote}))
  }

  async function sendReview(data) {
    const { targetShop } = useShop()

    const res = await api.post('/reviews', {
      shopId: targetShop.value.id,
      text: data.text,
      notes: data.notes
    })

    targetShop.value.reviews.push(res)
    await getCurrentUser()
  }
  
  async function updateUser(formData) {
    user.value = await api.put('/users', formData)
  }
  
  async function deleteUser(password) {
    console.log(password)
    await api.delete('/users', { data: { password } })
    const { logout } = useAuth()
    await logout()
  }

  return {
    user,
    createUser,
    getAllUsers,
    getCurrentUser,
    sendReview,
    updateUser,
    deleteUser
  }
}

export default useUser