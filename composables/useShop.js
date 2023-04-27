import { ref } from 'vue'

const targetShop = ref(null)

const useShop = () => {
  async function createShop() {
    const { newMarker, newMarkerName } = useMap()

    return await api.post('/shops', {
      ...newMarker.value._latlng,
      name: newMarkerName.value
    })
  }

  async function getAllShops() {
    return await api.get('/shops')
  }

  async function getShopDetails(shopId) {
    targetShop.value = await api.get('/shops/' + shopId)
  }
  
  async function getShopPodium() {
    return await api.get('/shops/podium')
  }

  return {
    targetShop,
    createShop,
    getAllShops,
    getShopDetails,
    getShopPodium,
  }
}

export default useShop