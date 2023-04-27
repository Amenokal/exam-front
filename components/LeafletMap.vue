<template>
  <div id="map"></div>
</template>

<script setup>

const { setMap, isEditing, newMarker } = useMap()
const { getAllShops, getShopDetails, getShopPodium } = useShop()

async function createMap() {

  // Data setup
  const shops = await getAllShops()
  const shopPodium = await getShopPodium()

  // Map setup
  const withReviewIcon = L.icon({
    iconUrl: './leaflet-markers/map-marker.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  })

  const withoutReviewIcon = L.icon({
    iconUrl: './leaflet-markers/map-marker-empty.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  })
  
  const newIcon = L.icon({
    iconUrl: './leaflet-markers/map-new-marker.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  })

  const crownIcons = [
    L.icon({
      className: "first-place",
      iconUrl: './leaflet-markers/map-trophy-gold.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    }),
    L.icon({
      className: "second-place",
      iconUrl: './leaflet-markers/map-trophy-silver.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    }),
    L.icon({
      className: "third-place",
      iconUrl: './leaflet-markers/map-trophy-bronze.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    })
  ]

  // Create map
  const map = L.map('map').setView([46.9, 2.213749], 5.5)

  map.on('click', (e) => {
    if(!isEditing.value) return

    if (newMarker.value != undefined)
      map.removeLayer(newMarker.value)

    newMarker.value = L.marker([e.latlng.lat, e.latlng.lng], {icon: newIcon}).addTo(map); 
  })

  // Create tiles
  const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    zoom: 10,
  })
  map.addLayer(tiles);

  // Create clusters
  const markersCluster = new L.MarkerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 50,
    iconCreateFunction: function(cluster) {
      return L.divIcon({ 
        html: cluster.getChildCount(), 
        className: 'mycluster', 
        iconSize: null 
      })
    },
  })

  shops.forEach((shop) => {
    if(!shopPodium.find((s) => s.id === shop.id)) {
      const latLng = new L.LatLng(shop.lat, shop.lng)
      const marker = new L.Marker(latLng, {
        icon: shop.reviews.length ? withReviewIcon : withoutReviewIcon,
        title: shop.name,
        data: shop })
      marker.on('click', (e) => getShopDetails(e.target.options.data.id))
      markersCluster.addLayer(marker)
    }
  })
  map.addLayer(markersCluster)

  // Create Markers
  shopPodium.forEach((topShop, i) => {
    const latLng = new L.LatLng(topShop.coords.lat, topShop.coords.lng)
    const marker = L.marker(latLng, {
      icon: crownIcons[i],
      title: topShop.name,
      data: topShop
    })
    marker.on('click', (e) => getShopDetails(e.target.options.data.id))
    marker.addTo(map)
  })

  return map
}

onMounted(async () => {
  const map = await createMap()
  setMap(map)
})

</script>