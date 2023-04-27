import axios from 'axios'
import { ref } from 'vue'

const map = ref(null)
const isEditing = ref(false)
const newMarker = ref({})
const newMarkerName = ref("")

const useMap = () => {

  /**
   * Map handlers
   * -•--------•-
   */

  function setMap(llMap) {
    map.value = llMap
  }

  function moveMap(lat, lng, zoom) {
    const { map } = useMap()
    map.value.flyTo(new L.LatLng(lat, lng), zoom, {
      animate: true,
      duration: 1.5
    })
  }

  /**
   * Search & select cities
   * -•------------------•-
   */

  const searchCityInput = ref("")
  const searchCityResults = ref([])

  // FRANCE GOUV API : https://geo.api.gouv.fr/decoupage-administratif/communes
  async function searchCity() {
    const res = await axios.get(`https://geo.api.gouv.fr/communes?nom=${searchCityInput.value}&boost=population&limit=5`)
    searchCityResults.value = res.data
  }

  // GEOCODE API : https://geocode.xyz/api
  async function selectCity(city) {
    isEditing.value = false
    const res = await axios.get(`https://geocode.xyz/${city.nom}?json=1&auth=108341386267358e15786325x4019`)
    moveMap(res.data.latt, res.data.longt, 12)
    resetSearchCity()
  }

  function resetSearchCity() {
    searchCityInput.value = ""
    searchCityResults.value = []
  }

  /**
   * Search & select shops
   * -•-----------------•-
   */

  const searchShopPage = ref(1)
  const searchShopInput = ref("")
  const searchShopResults = ref(null)

  async function searchShop() {
    if(!searchShopInput.value.length)
    return resetSearchShop()

    const res = await api.post("/shops/search", {
      input: searchShopInput.value,
      offset: searchShopPage.value * 5
    })

    searchShopResults.value = res
  }

  async function shopPrevPage() {
    if(searchShopPage.value - 1 > 0) {
      searchShopPage.value -= 1
      await searchShop()
    }
  }

  async function shopNextPage() {
    if(searchShopPage.value + 1 <= searchShopResults.value.pages) {
      searchShopPage.value += 1
      await searchShop()
    }
  }
  
  async function selectShop(shop) {
    isEditing.value = false
    moveMap(shop.lat, shop.lng, 18)
    resetSearchShop()
    const { getShopDetails } = useShop()
    await getShopDetails(shop.id)
  }

  function resetSearchShop() {
    searchShopInput.value = ""
    searchShopResults.value = []
  }

  function resetEditData() {
    isEditing.value = false
    newMarker.value = {}
    newMarkerName.value = ""
  }

  return {
    map, setMap,

    searchCityInput, searchCityResults,
    searchCity, selectCity, resetSearchCity,
    
    searchShopPage, shopPrevPage, shopNextPage,
    searchShopInput, searchShopResults,
    searchShop, selectShop, resetSearchShop,

    isEditing,
    newMarker, newMarkerName,
    resetEditData
  }
}

export default useMap