import type { Numeric } from "vant/es/utils"
import type {
  LanguageTranslationFormModel,
  LanguageWordFormModel,
} from "../types/models"
import { useSettingStore } from "../stores/useSettingStore"
import { useLanguageStore } from "../stores/useLanguageStore"
export interface Option {
  label: string
  value: number
}

export interface FormattedOption {
  text: string
  value: number
}

export function useHelpers() {
  const helpers = {
    formatOptions: (options: Option[]): FormattedOption[] => {
      return options.map((item: Option) => ({
        text: item.label,
        value: item.value,
      }))
    },
    setFromOptions: ({
      options,
      selectedValue,
      textField,
      idField,
    }: {
      options: FormattedOption[]
      selectedValue: Numeric | null
      textField: Ref<string>
      idField: Ref<Numeric[]>
    }) => {
      const selected = options.find((option) => option.value === selectedValue)
      if (selected) {
        textField.value = selected.text
        idField.value = [selected.value]
      }
    },

    translate: (key: string) => {
      let translate = ""
      let wordId = 0
      const translations = useSettingStore().userPreferredLanguage?.translations
      // const translations = useLanguagesStore().languages[0].translations
      let words = useLanguageStore().words
      if (words.length == 0) {
        words = JSON.parse(localStorage.getItem("languageWords") || "null")
      }

      if (words) {
        const systemWord = words.find(
          (sw: LanguageWordFormModel) => sw.word == key
        )
        if (systemWord && systemWord.id) {
          wordId = systemWord.id
        }
      }
      if (translations && wordId) {
        const translation = translations.find(
          (translation: LanguageTranslationFormModel) =>
            translation.system_language_word_id === wordId
        )
        if (translation) {
          translate = translation.translation
        }
      }
      return translate
    },
    toSnakeCase: (str: string) => {
      return str
        .toLowerCase()
        .replace(/[.\s]+/g, "_")
        .replace(/^_+|_+$/g, "")
    },
  }
  return helpers
}
