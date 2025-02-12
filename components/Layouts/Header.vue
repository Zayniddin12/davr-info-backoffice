<template>
  <header
    class="w-full bg-white py-4 px-6 z-20 flex items-center justify-between sticky top-0 header-shadow"
  >
    <div id="header-breadcrumbs"></div>

    <nav class="flex w-full h-full items-center gap-6 justify-end">
      <slot name="before-links" />

      <slot name="after-links"></slot>

      <ClientOnly>
        <BaseDropDown :profile-items="profileItems" :user="user" />
      </ClientOnly>
    </nav>
  </header>
</template>
<script lang="ts" setup>
import { useAuthStore } from '@/store/auth'

const store = useAuthStore()

const user = computed(() => store.user)
const { t } = useI18n()
interface Props {
  links?: {
    title: string
    to: string
  }[]
  activeRoute?: string
}

defineProps<Props>()

const profileItems = [
  {
    title: t('help'),
    event: 'on-profile',
  },
]
</script>

<style scoped>
.header-shadow {
  box-shadow: 0 -4px 58px #0000000f !important;
}
</style>
