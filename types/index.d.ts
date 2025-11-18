import type { FormModel } from "~/types/models"

export * from "~/types/models"

// export * from Models

export enum RoutePaths {
  AUTH_USER = "auth/user",
  AUTH_LOGOUT = "auth/logout",

  USERS = "users",
  USERS_ROLES = "users/roles",
  USERS_LOGIN_UPDATE = "users/update-login",

  PEOPLE_GROUPS = "people-groups",
  DENOMINATIONS = "denominations",
  FAITH_MILESTONES = "faith-milestones",
  COMMUNICATION_PLATFORMS = "communication-platforms",
  COMMUNITY_CHECKLISTS = "community-checklists",

  CONTACTS = "contacts",
  CHURCHES = "churches",
  COMMUNITIES = "communities",

  LANGUAGES = "languages",
  LANGUAGE_WORDS = "languages/words",

  SETTINGS_STATUSES = "settings/statuses",
  SETTINGS_PRAYERS = "settings/prayers",

  PROFILE_CHANGE_PASSWORD = "profile/change-password",

  PRAYER_PROMPTS = "prayer-prompts",

  CONTACT_PRAYER_COUNT = "prayer-count/contact",
  CHURCH_PRAYER_COUNT = "prayer-count/church",
}

export type GenderTypes = "male" | "female"

export type AgeGroups =
  | "Under 18 years old"
  | "18-25 years old"
  | "26-40 years old"
  | "Over 40 years old"

export type StoreOptions =
  | false
  | {
      storeState: any
      isPersist: boolean
      key: string
    }

export type CommonBrowseCondition = {
  search?: string
  search_by?: string

  sort?: { key: string; order: "asc" | "desc" }[]

  whereIn?: { key: string; value: any[] }
  whereNotIn?: { key: string; value: any[] }
  whereHas?: { key: string; where: string; value: any }
  limit?: number

  // with?: string[]
  with?: any

  // where?: { key: string; value: any }[]
  where?: any
  withExists?: string[]

  onlyTrashed?: boolean
}

export interface BrowseConditionAll extends CommonBrowseCondition {
  all: true
}

export interface BrowseConditionPaged extends CommonBrowseCondition {
  page: number
  per_page: number
}

export type BrowseCondition = BrowseConditionAll | BrowseConditionPaged

export type ListCondition = {
  labelOption: string
  limit: number
}

export type FilterOptions =
  | false
  | { whereFieldIs: string; values: { label: string; value: string }[] }

export type ModalWidthSize =
  | "600px"
  | "800px"
  | "1000px"
  | "50%"
  | "calc(100vw - 40px)"
  | string

export type FormModalOptions = {
  moduleName?: string
  routePath: RoutePaths
  components: {
    formComponent: object
    buttonIconComponent?: object
  }
  form: FormModel
  hiddenFieldsOnEdit: string[]
  width?: ModalWidthSize
}

export type Credentials = {
  identifier: string
  password: string
  platform: string
}

export type AuthUser = {
  id: number
  name: string
  username: string
  biography: string

  email: string
  phone_number: string

  user_role_id: number
  preferred_language_id: number | null
  is_active: boolean
  first_time_login: boolean

  email_verified_at: string | null
  last_login_at: string | null

  created_at: string
  updated_at: string | null
  deleted_at: string | null
}
