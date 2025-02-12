<template>
  <BaseDropDown head-class="cursor-pointer">
    <template #head="{ show }">
      <div class="flex-y-center gap-3">
        <div>
          <p
            v-if="user.full_name"
            class="font-semibold text-base text-dark mb-0.5"
          >
            {{ user?.full_name }}
          </p>
          <p class="text-sm text-gray-200 text-right">
            {{ user?.role }}
          </p>
        </div>

        <CardsAvatar
          :image="user?.avatar_url"
          avatar-class="border-2 border-gray/[60]"
          size="sm"
        />

        <span
          :class="{ 'rotate-180': show }"
          class="icon-chevron font-medium transition-200 text-2xl text-gray-100"
        ></span>
      </div>
    </template>
    <ul class="p-1 shadow-dropdown">
      <li
        v-for="(item, idx) in dropdownItems"
        :key="idx"
        :class="item.styles"
        class="transition-200 flex flex-col gap-1 text-sm w-full text-dark hover:bg-gray/[10%] rounded"
        @click="item.action"
      >
        <div
          :class="{ '!border-b-0': idx === dropdownItems.length - 1 }"
          class="flex-y-center px-3 py-2 border-b border-[#F5F6F7] gap-2"
        >
          <i :class="item?.icon" class="!text-xs" />
          {{ item.label }}
        </div>
      </li>
    </ul>
  </BaseDropDown>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/store/auth'

defineComponent({
  name: 'HeaderProfile',
})

interface Props {
  profileItems?: {
    title: string
    class?: string
    icon?: string
    event?: string
  }[]
}

defineProps<Props>()

const router = useRouter()
const { t } = useI18n()
const store = useAuthStore()

// const user = computed(() => store.user)

const user = ref({
  username: 'Zayniddin',
  avatar_url: undefined,
  full_name: 'Mamatqulov',
  phone: '+998882789696',
  role: 'mentor',
  date_joined: '12-02-2025',
  is_active: true,
  is_birth_date: '11-09-2005',
  car_count: 0,
  charge_point_count: 2,
  balance: 2000000,
  active_status: true,
  is_admin: true,
})

interface IDropdownItem {
  label: string
  styles?: string
  action: () => void
  icon: string
}

const dropdownItems: IDropdownItem[] = [
  {
    label: t('log_out'),
    styles: 'text-red-500 hover:!bg-red-50',
    action: () => logout(),
    icon: 'icon-chevron-left',
  },
]

function logout() {
  store.logout()
  router.push({ name: 'PAuth' })
}
</script>
