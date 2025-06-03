<template>
  <div class="photo-slider" @click="handleTap">
    <van-swipe
      class="swipe-container"
      :loop="true"
      :show-indicators="false"
      :touchable="true"
    >
      <van-swipe-item v-for="i in 10" :key="i">
        <img :src="`/images/${i}.jpg`" class="slide-image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const tapCount = ref(0)
const lastTapTime = ref(0)
const TAP_TIMEOUT = 3000 // 3 seconds
const REQUIRED_TAPS = 7
const authUser = localStorage.getItem("authUser")

function handleTap() {
  const currentTime = Date.now()
  
  if (currentTime - lastTapTime.value > TAP_TIMEOUT) {
    // Reset if more than 3 seconds have passed
    tapCount.value = 1
  } else {
    tapCount.value++
  }
  lastTapTime.value = currentTime
  
  if (tapCount.value >= REQUIRED_TAPS) {
    const pinNumber = localStorage.getItem('PINNumber')
    if (!authUser) {
      router.push('/welcome')
    } else if(authUser && pinNumber) {
      router.push('/pin')
    } else if(authUser && !pinNumber) {
      router.push('/splash')
    }

  }
}
</script>

<style scoped>
.photo-slider {
  width: 100vw;
  height: 100vh;
  background: #000;
}

.swipe-container {
  width: 100%;
  height: 100%;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
