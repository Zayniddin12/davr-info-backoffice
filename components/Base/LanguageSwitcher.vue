<template>
  <BaseDropDown head-class="cursor-pointer">
    <template #head="{ show }">
      <div
        class="transition-300 flex items-center justify-between gap-1 bg-white group pl-4 p-1 rounded-md"
      >
        <div
          class="flex-y-center space-x-1 text-gray-100 hover:text-gray-700 transition-300"
        >
          <i class="icon-language flex-center text-base h-4" />
          <span class="text-2xs leading-[123%]">
            {{ currentLanguage }}
          </span>
          <i
            :class="{ 'rotate-180': show }"
            class="icon-chevron transition-200 !text-xs inline-block"
          ></i>
        </div>
      </div>
    </template>

    <ul class="p-2 shadow-dropdown">
      <li
        v-for="(item, index) in languages"
        :key="index"
        :class="{
          'bg-gray-300/[0.24] !font-medium':
            item.value === currentLanguage?.name,
        }"
        class="transition-200 min-w-[118px] px-3 py-2 rounded text-2xs text-dark-100 hover:bg-gray-300/[0.24] flex-center-between"
        @click="changeLocale(item.value)"
      >
        <span>{{ item.label }}</span>
        <i
          v-if="item.value === currentLanguage?.name"
          class="icon-tick-square !text-base text-green"
        ></i>
      </li>
    </ul>
  </BaseDropDown>
</template>

<script lang="ts" setup>
import { ELanguage } from '@/types/languageSwitcher'
import type { ILanguage } from '@/types/languageSwitcher'
import { useLanguageSwitcher } from '~/composables/useLanguageSwitcher'

const { changeLocale, currentLanguage, languagesList } = useLanguageSwitcher()

const languages: ILanguage[] = [
  {
    value: ELanguage.UZ,
    label: "O'zbekcha",
    icon: '/images/svg/flag/uz.svg',
  },
  {
    value: ELanguage.RU,
    label: 'Русский',
    icon: '/images/svg/flag/ru.svg',
  },
  {
    value: ELanguage.EN,
    label: 'English',
    icon: '/images/svg/flag/en.svg',
  },
]
</script>
