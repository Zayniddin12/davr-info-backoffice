<script setup lang="ts">
import { SectionSidebar } from '#components';

</script>

<template>
  <div class="bg-[#F5F6F7] min-h-screen flex">
    <SectionSidebar />

    <div class="w-full h-full">
      <!-- <CHeader v-bind="{ activeRoute }" /> -->

      <div class="h-full w-full p-6">
        <div class="w-full h-full">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

