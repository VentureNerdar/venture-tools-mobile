import type { Numeric } from "vant/es/utils"

export interface Option {
  label: string
  value: number
}

export interface FormattedOption {
  text: string
  value: number
}

export function useHelpers () {

  const helpers = {
    formatOptions: (options:Option[]): FormattedOption[] =>  {
      return options.map((item:Option) => ({
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
      options: FormattedOption[],
      selectedValue: Numeric | null,
      textField: Ref<string>,
      idField: Ref<Numeric[]>
    }) => {
      const selected = options.find(option => option.value === selectedValue)
      if (selected) {
        textField.value = selected.text
        idField.value = [selected.value]
      }
    }
  }
  return helpers
}