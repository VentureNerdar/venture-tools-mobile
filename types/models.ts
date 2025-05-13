import type { AgeGroups, GenderTypes } from "."
import type { Numeric } from "vant/es/utils"

export interface UserFormModel {
  name: string 
  username: string | null
  email: string | null
  user_role_id: string | null
  is_active: boolean
  phone_number: string | null
  biography: string | null
  preferred_language_id: number | null
  id?: number
  password?: string | null
  password_confirmation?: string | null
  last_login_at?: Date
  email_verified_at?: Date
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

export interface ContactFormModel {
  id?: number
  contact_status_id?: number | null
  // contact_status_id: Numeric[]
  faith_status_id?: Numeric | null
  assigned_to?: number | null

  name: string
  nickname?: string
  gender: GenderTypes | null
  age: AgeGroups | null
  baptism_date?: any | null
  baptized_by?: Numeric | null
  current_prayers?: string | null
  faith_milestones?: number[] | null
  people_group?: Numeric[] | null
  // contact_communication_platforms?: { [key: number]: any[] }
  // contact_communication_platforms?: number[] | string[]
  contact_communication_platforms?: any[]

  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

export interface ChurchFormModel {
  id?: number
  is_active: boolean | null
  assigned_to?: number | null

  church_planters?: any | null

  name: string 
  location_longitude: string | null
  location_latitude: string | null
  google_location_data: string | null
  description?: string
  founded_at?: any | null
  phone_number?: string 
  website?: string 
  denomination_id?: number | null
  is_visited?: boolean | null
  church_members_count?: number | undefined
  confession_of_faith_count?: number | undefined
  baptism_count?: number | undefined 
  community_id: number | null
  community?: CommunityFormModel[] | null

  parent_church_id?: number | null
  current_prayers?: string 

  deleted_at?: Date
  created_at?: Date
  updated_at?: Date
}

export interface LanguageFormModel {
  id?: number
  is_enabled: number
  label: string
  name: string
  locale: string
  created_at: Date
  updated_at: Date
  translations: [LanguageTranslationFormModel]
}

export interface LanguageTranslationFormModel {
  id?: number
  system_language_id: number
  system_language_word_id: number
  translation: string
  created_at: Date
  updated_at: Date
}

export interface LanguageWordFormModel {
  id?: number
  word: string
  created_at: Date
  updated_at: Date
}

export interface DenominationFormModel {
  name: string | null
  description?: string | null
  id?: number
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

export interface CommunicationPlatformFormModel {
  name: string | null
  id?: number
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

export interface UserRoleFormModel {
  name: string | null
  label: string | null
  description?: string | null
  id?: number
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

export interface PeopleGroupFormModel {
  name: string | null
  translations: object | null
  id?: number
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

export interface FaithMilestoneFormModel {
  name: string | null
  icon: string | null
  id?: number
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

export interface CommunityChecklistFormModel {
  name: string | null
  id?: number
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

export interface CommunityPeacePersonFormModel {
  id?: number
  name: string
  email: string 
  phone: string 
  originalName?: string 
  created_at?: Date
  updated_at?: Date
}

export interface CommunityCommittee {
  id?: number
  name: string 
  originalName?: string 

  created_at?: Date
  updated_at?: Date
}

export interface CommunityFormModel {
  id?: number

  name: string | null
  location_longitude: string | null
  location_latitude: string | null
  google_location_data: string | null
  conducted_survey_of_community_needs: boolean
  community_needs_1: string | null
  community_needs_2: string | null
  community_needs_3: string | null
  community_needs_4: string | null
  community_needs_5: string | null
  created_by: number

  peace_persons: CommunityPeacePersonFormModel[]
  committees: CommunityCommittee[]

  checklists?:
    | CommunityChecklistFormModel[]
    | { id: number; checked: boolean }[]
    | number[]
    | null

  churches: ChurchFormModel[] | null
  churchPlanters: [] | null

  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

export type FormModel =
  | UserFormModel
  | UserRoleFormModel
  | PeopleGroupFormModel
  | ContactFormModel
  | ChurchFormModel
  | CommunityFormModel
  | LanguageFormModel
  | LanguageTranslationFormModel
  | LanguageWordFormModel
  | DenominationFormModel
  | FaithMilestoneFormModel
  | CommunicationPlatformFormModel
  | CommunityChecklistFormModel
