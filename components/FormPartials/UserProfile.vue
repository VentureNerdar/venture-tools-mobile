<template>
  <div>
    <VanField
      center
      clearable
      :label="h.translate('user_profile')"
    >
      <template #input>
        <VanField
          v-model="d.profileUser"
          :placeholder="h.translate('enter_profile')"
          clearable
          readonly
          @clear="m.handle.click.clear"
        >
          <template #right-icon>
            <VanIcon
              v-if="d.profileUser"
              style="margin-right: 10px; color: #999"
              name="clear"
              @click="m.handle.click.clear"
            />
          </template>
        </VanField>
      </template>
      <template #button>
        <VanButton
          style="margin-right: 10px"
          icon="plus"
          type="primary"
          size="small"
          @click="m.handle.click.modal"
        />
      </template>
    </VanField>

    <!-- show-cancel-button -->
    <VanDialog
      v-model:show="d.visibility.modal"
      :title="h.translate('add_user_profile')"
      :confirm-button-text="h.translate('cancel')"
      @cancel="m.handle.click.close"
    >
      <VanCellGroup>
        <VanSearch
          v-model="d.searchWord"
          show-action
          :placeholder="h.translate('search')"
          shape="round"
          @search="m.handle.search"
          @cancel="d.searchWord = ''"
        />
      </VanCellGroup>
      <div class="scrollable-dialog-content">
        <VanCellGroup
          v-for="(user, index) in d.profileUsers"
          :key="index"
          inset
        >
          <VanCell
            :title="user.label"
            @click="m.handle.click.rowClick(user)"
          />
        </VanCellGroup>
      </div>
    </VanDialog>
  </div>
</template>

<script lang="ts" setup>
import { RoutePaths } from "~/types/index.d"

const h = useHelpers()
const consume = {
  users: useConsumeApi(RoutePaths.USERS),
}

const props = withDefaults(
  defineProps<{
    userProfileId?: number | null
  }>(),
  {
    userProfileId: null,
  },
)

const emit = defineEmits(["update", "clear"])

const d = reactive({
  visibility: {
    modal: false,
  },
  profileUsers: [] as { label: string; value: number }[],
  profileUser: "",
  isEditing: false,
  isAllowClear: false,
  searchWord: "",
})

const route = useRoute()
if (route.query.moduleName && route.query.moduleName.id) {
  d.isEditing = true
}
if (d.isEditing) {
  d.isAllowClear = false
}

const m = {
  handle: {
    click: {
      modal: () => {
        d.visibility.modal = true
      },
      save: () => {
        d.visibility.modal = false
      },
      close: () => {
        d.visibility.modal = false
      },
      rowClick: (user: { label: string; value: number }) => {
        d.profileUser = user.label
        d.visibility.modal = false
        emit("update", user.value)
      },
      clear: () => {
        d.profileUser = ""
        emit("clear")
      },
    },
    search: async () => {
      const user = await consume.users.browse({
        all: true,
        search: d.searchWord,
        search_by: "name",
      })
      d.profileUsers = user.map((user: any) => {
        return {
          label: user.name,
          value: user.id,
        }
      })
    },
  },
  consume: {
    defaultUserProfileOptions: async () => {
      const users = await consume.users.list({
        labelOption: "name",
        limit: 20,
      })
      d.profileUsers = users
    },
  },
}

m.consume.defaultUserProfileOptions()
console.log("IS Editing", d.isEditing)

watch(
  () => props.userProfileId,
  async () => {
    if (props.userProfileId) {
      //fetch this user
      const user = await consume.users.browse({
        all: true,
        where: JSON.stringify([
          {
            key: "id",
            value: props.userProfileId,
          },
        ]),
      })
      if (user) {
        d.profileUser = user[0].name
      }
    }
  },
)

watch(
  () => d.searchWord,
  () => {
    if (d.searchWord === "") {
      console.log("Work")
      m.consume.defaultUserProfileOptions()
    }
  },
)
</script>

<style scoped>
::v-deep(.van-dialog__confirm),
::v-deep(.van-dialog__cancel) {
  background-color: #0c3156 !important;
}
.scrollable-dialog-content {
  min-height: 300px;
  max-height: 500px;
  overflow-y: auto;
  margin-top: 10px;
}

::v-deep(.van-search__action) {
  color: white !important;
}
</style>
