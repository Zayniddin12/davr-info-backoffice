<template>
  <div
    :class="[isOpen ? 'w-[265px]' : 'w-[75px]']"
    class="h-screen transition-300 shrink-0"
  />

  <pre>{{ menu }}</pre>
  <div
    :class="[isOpen || hovered ? 'w-[265px]' : 'w-[75px]']"
    class="h-screen bg-gray transition-300 fixed flex flex-col justify-between z-30 overflow-hidden"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <div
      class="absolute top-[77px] left-0 w-full h-[620px] before:absolute before:left-0 before:top-[-50px] before:h-[620px] before:w-full z-[1] before:z-0 before:bg-no-repeat before:bg-cover"
    ></div>
    <div class="z-20">
      <div
        class="w-full px-4 py-3.5 flex items-center justify-center border-b border-gray-100 bg-transparent"
      >
        <div
          :class="{ 'opacity-0 invisible !w-0': !isOpen && !hovered }"
          class="relative overflow-hidden transition-300 w-[211px]"
        >
          <RouterLink to="/">
            <div class="flex items-center gap-2.5">
              <div
                class="size-7 rounded-md flex items-center justify-center bg-warning"
              >
                <img
                  class="size-5 ronded-xs"
                  :src="menu.avatar ?? '/images/defaltProfile.svg'"
                  alt="user photo"
                />
              </div>
              <p class="text-base font-extrabold capitalize text-dark">
                {{ menu.user }}
              </p>
            </div>
          </RouterLink>
        </div>
        <div
          class="cursor-pointer w-6 h-6 flex items-center justify-center transition-300"
          @click="toggleSidebar"
        >
          <span
            :class="{ '!rotate-180': !isOpen }"
            class="flex items-center transition-300"
          >
            <svg
              fill="black"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.7071 6.70711C13.0976 6.31658 13.0976 5.68342 12.7071 5.29289C12.3166 4.90237 11.6834 4.90237 11.2929 5.29289L5.29289 11.2929C4.91431 11.6715 4.90107 12.2811 5.26285 12.6757L10.7628 18.6757C11.136 19.0828 11.7686 19.1103 12.1757 18.7372C12.5828 18.364 12.6103 17.7314 12.2372 17.3243L7.38414 12.0301L12.7071 6.70711Z"
                fill="black"
              />
              <path
                d="M19.7071 6.70711C20.0976 6.31658 20.0976 5.68342 19.7071 5.29289C19.3166 4.90237 18.6834 4.90237 18.2929 5.29289L12.2929 11.2929C11.9143 11.6715 11.9011 12.2811 12.2628 12.6757L17.7628 18.6757C18.136 19.0828 18.7686 19.1103 19.1757 18.7372C19.5828 18.364 19.6103 17.7314 19.2372 17.3243L14.3841 12.0301L19.7071 6.70711Z"
                fill="black"
                opacity="0.4"
              />
            </svg>
          </span>
        </div>
      </div>
      <pre>{{ menuItems }}</pre>
      <div class="flex flex-col py-5 gap-1">
        <div v-for="(menuItem, index) in menuItems" :key="index">
          <div
            class="py-3 px-5 hover:bg-blue-200/10 transition-300 flex items-center group gap-3 h-12"
          >
            <span
              :class="`icon-${menuItem.icon}`"
              class="text-xl text-dark group-hover:!text-primary transition-300"
            ></span>
            <p>{{ $t(menuItem?.name) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { menu, menuItems } from '/data/menu'

const isOpen = ref(true)
const hovered = ref(false)
const toggleSidebar = () => {
  isOpen.value = !isOpen.value

  if (!isOpen.value) {
    hovered.value = false
    isOpen.value = false
  }
}
</script>
