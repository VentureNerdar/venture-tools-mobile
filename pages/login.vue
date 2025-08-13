<template>
  <VanSpace
    direction="vertical"
    fill
  >
    <VanNavBar
      title="Venture Tools"
      :border="false"
    />

    <VanCellGroup
      :inset="true"
      title="Welcome! Please login to continue"
    >
      <VanField
        v-model="d.form.identifier"
        label="Username"
        placeholder="Username or Email"
      />
      <VanField
        v-model="d.form.password"
        label="Password"
        placeholder="Password"
        type="password"
      />
    </VanCellGroup>

    <VanCellGroup
      :inset="true"
      style="margin-top: 10px"
    >
      <VanButton
        type="primary"
        block
        :disabled="loginButtonDisabled"
        :loading="d.loading.btnLogin"
        @click="m.handle.login"
      >
        Login
      </VanButton>
    </VanCellGroup>

    <div style="margin-top: 10px">
      <div style="text-align: center">
        <div style="font-size: 16px">
          Don't have an account?
          <span
            style="color: #007aff; font-size: 16px"
            @click="router.push('/register')"
            >Register here</span
          >
        </div>
      </div>
    </div>
  </VanSpace>
</template>

<script setup lang="ts">
import type { Credentials } from "~/types"
import { useAuthStore } from "~/stores/useAuthStore"
import { showNotify } from "vant"
import { useRouter } from "vue-router"

const router = useRouter()

const d = reactive({
  loading: {
    btnLogin: false,
  },
  form: {
    identifier: "seb@demo.com",
    password: "demodemo",
    platform: "mobile",
    // identifier: "testdm@gmail.com",
    // password: "password",
    // platform: "mobile",
  } as Credentials,
})

const m = {
  handle: {
    login: async () => {
      d.loading.btnLogin = true

      const response = await useAuthStore().login(d.form)

      if (response) {
        showNotify({
          type: "success",
          message: `Welcome back ${response.user.name}!`,
        })

        setTimeout(() => {
          d.loading.btnLogin = false
          navigateTo("/splash")
        }, 300)
      } else {
        d.loading.btnLogin = false
        showNotify({
          type: "danger",
          message: "Invalid credentials",
        })
      }
    },
  },
}

const loginButtonDisabled = computed(() => {
  return !d.form.identifier || !d.form.password
})
</script>
