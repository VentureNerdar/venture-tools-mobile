<template>
  <div
    class="photo-slider"
    @click="handleTap"
  >
    <van-swipe
      class="swipe-container"
      :loop="true"
      :show-indicators="false"
      :touchable="true"
      :initial-swipe="initialIndex"
    >
      <van-swipe-item
        v-for="i in 10"
        :key="i"
      >
        <img
          :src="`/images/${i}.jpg`"
          class="slide-image"
        />
      </van-swipe-item>
    </van-swipe>
    <div class="title">Venture Tools</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useSettingStore } from "~/stores/useSettingStore"

const router = useRouter()
const tapCount = ref(0)
const lastTapTime = ref(0)
const TAP_TIMEOUT = 3000 // 3 seconds
const REQUIRED_TAPS = 7
const authUser = localStorage.getItem("authUser")
const initialIndex = ref(Math.floor(Math.random() * 10))
const settingStore = useSettingStore()

onMounted(async () => {
  await settingStore.loadFromSecureStorage()
})

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
    // const pinNumber = localStorage.getItem("PINNumber")
    const pinCode = settingStore.pinCode
    if (!authUser) {
      router.push("/welcome")
    } else if (authUser && pinCode) {
      router.push("/pin")
    } else if (authUser && !pinCode) {
      router.push("/splash")
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

.title {
  width: 220px;
  height: 40px;
  line-height: 40px;
  position: absolute;
  color: #fff;
  background-color: #17badf;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 10;
  text-align: center;
  border-radius: 4px;
}
</style>
