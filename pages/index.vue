<template>
  <div>
    <div class="py-4 px-5 w-full bg-white rounded-xl mb-6 flex gap-4">
      <div class="flex gap-1 items-center p-1 rounded-xl bg-gray">
        <div
          v-for="(item, key) in dateTable"
          :key="key"
          class="cursor-pointer transition-300"
        >
          <div
            v-if="item?.name != 'date_create'"
            class="p-2 text-xs font-medium leading-130 text-dark text-center rounded-lg"
            :class="{ 'bg-white': activeDate == key }"
            @click="selectDateType(key)"
          >
            {{ item?.name }}
          </div>
          <div v-else>
            <FormInputRangePick
              :start-value="dateFrom"
              :end-value="dateTo"
              :is-clear="isClear"
              :placeholder="t(item.name)"
              @update:model-value="upDateRangePick"
              v-bind="{ isActive }"
            />
          </div>
        </div>
      </div>
    </div>
    <main class="grid grid-cols-1 gap-6">
      <div class="grid grid-cols-4 gap-x-5 gap-y-6">
        <CardsInfo
          v-for="(card, idx) in staticsCards"
          :key="idx"
          :card="card"
        />
      </div>
      <div class="w-full grid grid-cols-4 gap-5">
        <ClientOnly
          ><ChartsLine :data="mainStore.appUsageStats" class="col-span-2"
        /></ClientOnly>
        <ClientOnly
          ><ChartsGender :data="genderChartData" class="col-span-1"
        /></ClientOnly>
        <ClientOnly
          ><ChartsAge :data="ageChartData" class="col-span-1"
        /></ClientOnly>
      </div>
      <!-- <TActiveUsers :is-search="false" no-footer />
      <TLastRegisterUsers /> -->
    </main>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'
// import CAgeChart from '@/components/Charts/CAgeChart.vue'
// import TActiveUsers from '@/modules/Dashboard/components/Tables/TActiveUsers.vue'
// import TLastRegisterUsers from '@/modules/Dashboard/components/Tables/TLastRegisterUsers.vue'
import ApiService from '@/services/ApiService'
import type { ChargingStationStats } from '@/types/dashboard'
import { useDashboardStore } from '@/store/dashboard'
import dayjs from 'dayjs'
import { ChartsLine, ClientOnly } from '#components'

const router = useRouter()
const { t } = useI18n()
const route = useRoute()
const mainStore = useDashboardStore()
const activeDate = ref()
const isActive = ref(false)
const isClear = ref(false)
const dateFrom = ref(0)
const dateTo = ref(0)
const today = new Date()
today.setHours(0, 0, 0, 0)
const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)
yesterday.setHours(0, 0, 0, 0)
const firstDayOfWeek = new Date()
const dayOfWeek = firstDayOfWeek.getDay()
const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1 // Adjust for Monday as start of the week
firstDayOfWeek.setDate(firstDayOfWeek.getDate() - mondayOffset)
firstDayOfWeek.setHours(0, 0, 0, 0)
const oneMonthAgo = new Date()
oneMonthAgo.setDate(1)
oneMonthAgo.setHours(0, 0, 0, 0)
const staticsCards = reactive([
  {
    icon: 'icon-users',
    count: '1000000',
    title: t('eez'),
    class: 'plugin',
  },
  {
    icon: 'icon-users',
    count: '1000000',
    title: t('static_cards.users'),
    class: 'users',
  },
  {
    icon: 'icon-users',
    count: '1000000',
    title: t('static_cards.cars'),
    class: 'cars',
  },
  {
    icon: 'icon-users',
    count: '1000000',
    title: t('static_cards.transactions'),
    class: 'transaction',
  },
  {
    icon: 'icon-users',
    count: '1000000',
    title: t('static_cards.paid_cost'),
    class: 'paid_cost',
  },
  {
    icon: 'icon-users',
    count: '1000000',
    title: t('static_cards.used_kv'),
    class: 'used_kv',
  },
  {
    icon: 'icon-users',
    count: '1000000',
    title: t('static_cards.station_owners'),
    class: 'user',
  },
  {
    icon: 'icon-users',
    count: '1000000',
    title: t('static_cards.visit_per_month'),
    class: 'station_owners',
  },
])
const dateTable = [
  {
    id: 1,
    name: t('today'),
    date: dayjs(today).format('DD-MM-YYYY'),
    toDate: dayjs(today.getDate() + 1).format('DD-MM-YYYY'),
  },
  {
    id: 2,
    name: t('yesterday'),
    date: dayjs(yesterday).format('DD-MM-YYYY'),
    toDate: dayjs(today).format('DD-MM-YYYY'),
  },
  {
    id: 3,
    name: t('week'),
    date: dayjs(firstDayOfWeek).format('DD-MM-YYYY'),
    toDate: dayjs(firstDayOfWeek.getDate() + 7).format('DD-MM-YYYY'),
  },
  {
    id: 4,
    name: t('month'),
    date: dayjs(oneMonthAgo).format('DD-MM-YYYY'),
    toDate: dayjs(
      new Date(today.getFullYear(), today.getMonth() + 1, 0),
    ).format('DD-MM-YYYY'),
  },
  {
    id: 5,
    name: t('quarter'),
    date: dayjs().subtract(1, 'month').startOf('month').format('DD-MM-YYYY'),
    // Last day of the next month
    toDate: dayjs().add(1, 'month').endOf('month').format('DD-MM-YYYY'),
  },
  {
    id: 6,
    name: 'date_create',
  },
]

const weeks = []
function upDateRangePick(value: [number, number]) {
  isActive.value = true
  isClear.value = false
  dateFrom.value = value[0]
  dateTo.value = value[1]
  router.replace({
    query: {
      from: dayjs(value[0]).format('DD-MM-YYYY'),
      to: dayjs(value[1]).format('DD-MM-YYYY'),
    },
  })
}
const routes = computed(() => [
  {
    name: t('main_page'),
    route: '/',
  },
])
function selectDateType(item: number) {
  isActive.value = false
  activeDate.value = item
  dateTable.forEach((e, key) => {
    if (key == item) {
      router.replace({
        query: { from: e.date, to: e.toDate },
      })
    }
  })
}
const getDashboardCount = async (from: string, to: string) => {
  if (from && to) {
    try {
      const res = await ApiService.get<ChargingStationStats>(
        `/dashboard-counts/?timestamp_gte=${from}&timestamp_lte=${to}`,
      )
      staticsCards[0].count = res.data.charge_point_count
      staticsCards[1].count = res.data.user_count
      staticsCards[2].count = res.data.car_count
      staticsCards[3].count = res.data.payment_transaction_count
      staticsCards[4].count = res.data.total_cost_used
      staticsCards[5].count = res.data.total_meter_used
      staticsCards[6].count = res.data.owners_count
      staticsCards[7].count = res.data.visits_count
    } catch (error) {
      console.log(error)
    }
  } else {
    try {
      const res =
        await ApiService.get<ChargingStationStats>(`/dashboard-counts`)
      staticsCards[0].count = res.data.charge_point_count
      staticsCards[1].count = res.data.user_count
      staticsCards[2].count = res.data.car_count
      staticsCards[3].count = res.data.payment_transaction_count
      staticsCards[4].count = res.data.total_cost_used
      staticsCards[5].count = res.data.total_meter_used
      staticsCards[6].count = res.data.owners_count
      staticsCards[7].count = res.data.visits_count
    } catch (error) {
      console.log(error)
    }
  }
}

watch(
  route,
  () => {
    activeDate.value = null
    isActive.value = true
    if (route?.query?.from && route?.query?.to) {
      const [dayFrom, monthFrom, yearFrom] = `${route?.query?.from}`.split('-')
      const [dayTo, monthTo, yearTo] = `${route?.query?.to}`.split('-')
      dateFrom.value = dayjs(
        new Date(`${yearFrom}-${monthFrom}-${dayFrom}`),
      ).toISOString()
      dateTo.value = dayjs(
        new Date(`${yearFrom}-${monthFrom}-${dayTo}`),
      ).toISOString()
      mainStore.dateTo = route?.query?.to
      mainStore.dateFrom = route?.query?.from
      dateTable.forEach((e, key) => {
        if (route?.query?.from == e.date) {
          activeDate.value = key
          dateFrom.value = 0
          dateTo.value = 0
          isClear.value = true
          isActive.value = false
        }
      })
    } else {
      activeDate.value = 0
    }
    mainStore.fetchAgeStats()
    mainStore.fetchGenderStats()
    mainStore.fetchAppUsageStats()
    getDashboardCount(route?.query?.from, route.query.to)
  },
  { deep: true, immediate: true },
)
const ageChartData = computed(() => [
  {
    label: t('up_to_18'),
    color: '#0D9CD9',
    amount: mainStore?.ageStats.under_18?.count || 20,
  },
  {
    label: '18-35',
    color: '#02BFDF',
    amount: mainStore?.ageStats['18_35']?.count || 18,
  },
  {
    label: '36-49',
    color: '#F2B33A',
    amount: mainStore?.ageStats['36_50']?.count || 40,
  },
  {
    label: '50-60',
    color: '#F55152',
    amount: mainStore?.ageStats['51_60']?.count || 50,
  },
  {
    label: t('over_60'),
    color: '#20CC65',
    amount: mainStore?.ageStats?.over_60?.count || 45,
  },
])
const genderChartData = computed(() => [
  // {
  //   gender: "others",
  //   count: mainStore.genderStats.others?.count,
  //   percentage: mainStore.genderStats.others?.percentage,
  // },
  {
    gender: 'female',
    count: mainStore.genderStats.female?.count,
    percentage: mainStore.genderStats.female?.percentage,
  },
  {
    gender: 'male',
    count: mainStore.genderStats.male?.count,
    percentage: mainStore.genderStats.male?.percentage,
  },
])
</script>
