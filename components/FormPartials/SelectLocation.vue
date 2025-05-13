<template>
  <div>
    <input 
      ref="searchInput"
      type="text"
      class="search-input"
      :placeholder="searchInputPlaceholder"
      @input="handleInput"
    />
    <div v-if="suggestions.length > 0" class="suggestions-container">
      <div 
        v-for="suggestion in suggestions" 
        :key="suggestion.id"
        class="suggestion-item"
        @click="handleSuggestionSelect(suggestion)"
      >
        {{ suggestion.description }}
      </div>
    </div>
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
const searchInput = ref<HTMLInputElement | null>(null)
const mapElement = ref<HTMLElement | null>(null)
const suggestions = ref<any[]>([])

// @ts-expect-error google maps
let map: google.maps.Map
// @ts-expect-error google maps
let marker: google.maps.marker.AdvancedMarkerElement
// @ts-expect-error google maps
let autocompleteService: google.maps.places.AutocompleteService

const handleInput = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const value = input.value.trim()
  
  if (value.length < 2) {
    suggestions.value = []
    return
  }

  try {
    const request = {
      input: value,
      types: ['geocode', 'establishment'],
    }
    
    const response = await autocompleteService.getPlacePredictions(request)
    suggestions.value = response.predictions || []
  } catch (error) {
    console.error('Error fetching suggestions:', error)
    suggestions.value = []
  }
}

const handleSuggestionSelect = async (suggestion: any) => {
  try {
    // @ts-expect-error google maps
    const { PlacesService } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary
    const placesService = new PlacesService(map)
    
    placesService.getDetails({
      placeId: suggestion.place_id,
      fields: ['geometry', 'name', 'formatted_address']
    }, (place: any, status: string) => {
      if (status === 'OK' && place && place.geometry) {
        const position = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }

        // Update map and marker
        map.setCenter(position)
        map.setZoom(15)
        marker.position = position
        marker.title = place.name || 'Selected Location'
        
        // Clear suggestions
        suggestions.value = []
        
        // Emit the selected location
        emit('update', position, place)
      }
    })
  } catch (error) {
    console.error('Error selecting place:', error)
  }
}

const searchInputPlaceholder = computed(() => {
  return h.translate('search_for_a_place_here') === '' ? 'Search for a place here' : h.translate('search_for_a_place_here')
})

onMounted(async () => {
  if (!import.meta.client) return

  try {
    console.log('Loading Google Maps libraries...')
    // Load required libraries
    // @ts-expect-error google maps
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary
    // @ts-expect-error google maps
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary
    // @ts-expect-error google maps
    const { AutocompleteService } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary

    console.log('Libraries loaded successfully')

    // Initialize the map with a default position
    let initialPosition = { lat: 13.7563, lng: 100.5018 } // Bangkok
    if(props.latitude && props.longitude) {
      initialPosition = { lat: props.latitude, lng: props.longitude }
    }

    const mapOptions = {
      center: initialPosition,
      zoom: 5,
      mapId: '49f84f4fe99b4c959dd7a6e3',
      /*
      styles: [
        {
          "featureType": "all",
          "elementType": "all",
          "stylers": [
            { "invert_lightness": true },
            { "saturation": 10 },
            { "lightness": 30 },
            { "gamma": 0.5 },
            { "hue": "#435158" }
          ]
        }
      ]
        */
    }

    console.log('Initializing map with options:', mapOptions)
    map = new Map(mapElement.value as HTMLElement, mapOptions)
    console.log('Map initialized successfully')

    // Initialize a marker
    marker = new AdvancedMarkerElement({
      map,
      position: initialPosition,
      title: 'Default Location'
    })

    // Initialize the Autocomplete service
    autocompleteService = new AutocompleteService()
    console.log('Autocomplete service initialized')
  } catch (error) {
    console.error('Error initializing map:', error)
  }
})
</script>

<style scoped>
.search-input {
  width: calc(100% - 40px);
  padding: 10px;
  margin: 10px 10px;
  border: 1px solid #0c3156;
  border-radius: 4px;
  font-size: 16px;
  color: #17badf;
  background-color: #0c3156;
}

.suggestions-container {
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background: #0a233d;
  border: 1px solid #0c3156;
  border-radius: 4px;
  z-index: 1000;
}

.suggestion-item {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #0c3156;
}

.suggestion-item:hover {
  background-color: #0a233d;
}

.map-container {
  width: calc(100% - 20px);
  height: 400px;
  margin-left: 10px;
  margin-top: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
