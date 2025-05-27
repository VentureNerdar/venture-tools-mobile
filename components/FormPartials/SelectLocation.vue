<template>
  <div>
    <input
      ref="searchInput"
      type="text"
      class="search-input"
      :placeholder="searchInputPlaceholder"
      @input="handleInput"
    />
    <div
      v-if="suggestions.length > 0"
      class="suggestions-container"
    >
      <div
        v-for="suggestion in suggestions"
        :key="suggestion.id"
        class="suggestion-item"
        @click="handleSuggestionSelect(suggestion.value)"
      >
        {{ suggestion.label }}
      </div>
    </div>
    <div
      id="map"
      ref="mapElement"
      class="map-container"
    ></div>
  </div>
</template>

<script
  setup
  lang="ts"
>
  import { onMounted, ref } from 'vue'

  // @ts-expect-error google maps
  const { AutocompleteSessionToken, AutocompleteSuggestion, Place } = await google.maps.importLibrary("places")
  // @ts-expect-error google maps
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary
  // @ts-expect-error google maps
  const { Geocoder } = await google.maps.importLibrary("geocoding")
  // @ts-expect-error google maps
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary

  type FormattedPlace = {
    place: any,
    viewport: any,
    lat: number,
    lng: number,
  }

  const props = defineProps<{
    latitude: number
    longitude: number
    places?: any
  }>()

  const emit = defineEmits(['update'])
  const h = useHelpers()
  const searchInput = ref<HTMLInputElement | null>(null)
  const mapElement = ref<HTMLElement | null>(null)
  const suggestions = ref<any[]>([])
  const position = reactive({
    lat: 0,
    lng: 0
  }) as { lat: number, lng: number }
  const modalTitle = ref('Select Location')
  const modalAddress = ref('')

  // @ts-expect-error google maps
  let map: google.maps.Map
  // @ts-expect-error google maps
  let mapMarker: google.maps.marker.AdvancedMarkerElement
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
      const token = new AutocompleteSessionToken()

      const suggestionRequest = {
        input: value,
        includedPrimaryTypes: ['geocode', 'establishment'],
        sessionToken: token,
      }

      const res2 = await AutocompleteSuggestion.fetchAutocompleteSuggestions(suggestionRequest)
      let Gsuggestions = [] as any[]
      res2.suggestions.forEach((sug: any) => {
        const predict = sug.placePrediction
        Gsuggestions.push({
          value: predict.placeId,
          label: predict.text.text
        })
      })

      console.log('Gsuggestions', Gsuggestions)
      suggestions.value = Gsuggestions
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      suggestions.value = []
    }
  }

  const handleSuggestionSelect = async (placeId: any) => {
    try {
      await getPlaceByPlaceID(placeId)
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
      let initialZoom = 5

      if (props.latitude && props.longitude) {
        initialPosition = { lat: props.latitude, lng: props.longitude }
        initialZoom = 19
      }

      // initialize map
      map = new Map(mapElement.value as HTMLElement, {
        center: initialPosition,
        zoom: initialZoom,
        mapId: '49f84f4fe99b4c959dd7a6e3',
        gestureHandling: 'greedy',
        styles: [
          { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
          { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
          { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#263c3f" }] },
          { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }] },
          { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
          { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
          { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
          { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#746855" }] },
          { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1f2835" }] },
          { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#f3d19c" }] },
          { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2f3948" }] },
          { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
          { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
          { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
          { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }] },
        ]
      })

      if ('places' in props && props.places && props.places.length > 0) {
        const place = JSON.parse(props.places)

        if (place.viewport) {
          map.fitBounds(place.viewport)
        }
      }

      // Initialize a marker
      mapMarker = new AdvancedMarkerElement({
        map,
        position: initialPosition,
        title: 'Default Location'
      })

      // @ts-expect-error google maps
      google.maps.event.addListener(map, 'drag', function () {
        try {
          mapMarker.position = { lat: map.getCenter().lat(), lng: map.getCenter().lng() }
          modalTitle.value = 'Latitude: ' + map.getCenter().lat() + ', Longitude: ' + map.getCenter().lng()
          modalAddress.value = ''
        } catch (err) {
          console.log(err)
        }
      })

      // @ts-expect-error google maps
      google.maps.event.addListener(map, 'dragend', function () {
        position.lat = map.getCenter().lat()
        position.lng = map.getCenter().lng()
        modalAddress.value = ''
        getGeoCode(position)
      })

      // @ts-expect-error google maps
      google.maps.event.addListener(map, 'click', async function (event: any) {
        console.log(event)
        map.setCenter(event.latLng)
        mapMarker.position = { lat: event.latLng.lat(), lng: event.latLng.lng() }

        if (event.placeId) {
          await getPlaceByPlaceID(event.placeId)
        } else {
          getGeoCode(event.latLng)
        }
      })
    } catch (error) {
      console.error('Error initializing map:', error)
    }
  })

  const getPlaceByPlaceID = async (placeID: string, setMapOption: boolean = true, emitOption: boolean = true) => {
    const place = new Place({ id: placeID })
    await place.fetchFields({
      fields: ['displayName', 'adrFormatAddress', 'formattedAddress', 'viewport', 'location', 'addressComponents', 'googleMapsURI', 'types']
    })

    const lng = place.location.lng()
    const lat = place.location.lat()

    modalTitle.value = place.displayName
    modalAddress.value = place.formattedAddress

    position.lat = lat
    position.lng = lng

    if (setMapOption) {
      setMap(position, place.viewport)
    }

    if (emitOption) {
      emit('update', position, place)
    }

    return {
      place: place,
      viewport: place.viewport,
      lat: lat,
      lng: lng
    } as FormattedPlace
  }

  const setMap = (post: { lat: number, lng: number }, viewport: any) => {
    map.setCenter(post)
    map.fitBounds(viewport)
    mapMarker.position = post
    suggestions.value = []
  }

  const getGeoCode = async (position: any) => {
    const geocoder = new Geocoder()
    const response = await geocoder.geocode({ location: position })
    emit('update', position, response)
  }
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
