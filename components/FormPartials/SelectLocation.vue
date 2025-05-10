<template>
  <div>
    <p style="padding-left: 10px;;">{{ h.translate('search_for_a_place_here') }}</p>
    <div ref="autocompleteContainer"></div>
    <!--
    <p v-if="placeData">Selected Place:</p>
    <pre v-if="placeData">{{ placeData }}</pre>
-->
    <div id="map" ref="mapElement" class="map-container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps({
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(['update'])
const h = useHelpers()
const autocompleteContainer = ref<HTMLElement | null>(null)
const mapElement = ref<HTMLElement | null>(null)
const placeData = ref<string | null>(null)
// @ts-expect-error google maps
let map: google.maps.Map
// @ts-expect-error google maps
let marker: google.maps.marker.AdvancedMarkerElement

onMounted(async () => {
  if (!import.meta.client) return

  // Load required libraries
  // @ts-expect-error google maps 
  const { PlaceAutocompleteElement } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary
  // @ts-expect-error google maps
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary
  // @ts-expect-error google maps
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary

  // Create and attach the autocomplete input
  const placeAutocomplete = new PlaceAutocompleteElement()
  autocompleteContainer.value?.appendChild(placeAutocomplete)
  console.log("placeAutocomplete", placeAutocomplete)

  // Initialize the map with a default position
  console.log("Props values", props.latitude, props.longitude)
  let initialPosition = { lat: 13.7563, lng: 100.5018 } // Bangkok
  if(props.latitude && props.longitude) {
    initialPosition = { lat: props.latitude, lng: props.longitude }
  }
// Bangkok
  map = new Map(mapElement.value as HTMLElement, {
    center: initialPosition,
    zoom: 5,
    mapId: 'DEMO_MAP_ID'
  })

  // Initialize a marker
  marker = new AdvancedMarkerElement({
    map,
    position: initialPosition,
    title: 'Default Location'
  })

  // On place select, update map and marker
  placeAutocomplete.addEventListener('gmp-select', async ({ placePrediction }: { placePrediction: any }) => {
    const place = placePrediction.toPlace()
    await place.fetchFields({ fields: ['displayName', 'formattedAddress', 'location'] })

    placeData.value = JSON.stringify(place.toJSON(), null, 2)

    const location = place.location
    if (location) {
      const position = { lat: location.lat(), lng: location.lng() }
      map.setCenter(position)
      map.setZoom(15)
      marker.position = position
      marker.title = place.displayName?.text || 'Selected Location'
      emit('update', position)
    }
  })
})




declare global {
  interface Window {
    initMapCallback: () => void
  }
}
</script>

<style scoped>
p {
  font-family: Roboto, sans-serif;
}

.map-container {
  width: 100%;
  height: 400px;
  margin-top: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

</style>
