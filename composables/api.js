import axios from "axios"
import useUser from "./useUser"

const instance = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true
})

instance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if(!error.response)
    return console.error(error.message)

    if(error.response.status == 401) {
      const { logout } = useAuth()
      logout()
    }
    return Promise.reject(error.response.data.message)
  }
)

export default instance