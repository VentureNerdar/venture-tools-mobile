<template>
  <VanSpace direction="vertical" fill>
    <VanNavBar title="Venture Tools" :border="false" />

    <VanCellGroup :inset="true" title="Welcome! Please login to continue">
      <VanField
        v-model="d.form.email"
        label="Username"
        placeholder="Username"
      />
      <VanField
        v-model="d.form.password"
        label="Password"
        placeholder="Password"
        type="password"
      />
    </VanCellGroup>

    <VanCellGroup :inset="true" style="margin-top: 10px">
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
  </VanSpace>
</template>

<script setup lang="ts">
import type { Credentials } from "~/types"
import { useAuthStore } from "~/stores/useAuthStore"
import { showNotify } from "vant"

const d = reactive({
  loading: {
    btnLogin: false,
  },
  form: {
    email: "jill@demo.com",
    password: "demodemo",
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
        showNotify({
          type: "danger",
          message: "Invalid credentials",
        })
      }
    },
  },
}

const loginButtonDisabled = computed(() => {
  return !d.form.email || !d.form.password
})
</script>
