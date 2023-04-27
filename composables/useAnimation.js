import { ref } from 'vue'

const animHome = ref(true)
const animApp = ref(true)

const useAnimation = () => {
  return { animHome, animApp }
}

export default useAnimation