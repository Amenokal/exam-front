import useUser from './useUser'

const loaded = ref(true)

const useAuth = () => {
  const router = useRouter()
  const { user } = useUser()

  async function login(data) {
    const res = await api.post('/login', data)
    user.value = res.data
    router.push('/map')
  }

  async function refresh() {
    try {
      const res = await api.post('/refresh')
      user.value = res.data
    }
    catch(err) {
      logout()
    }
  }
  
  async function logout() {
    await api.post('/logout')
    user.value = null
    router.push('/')
  }

  return {
    loaded,
    login,
    refresh,
    logout
  }
}

export default useAuth