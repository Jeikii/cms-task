<script setup>
import { ref } from 'vue'
import { useFormStore } from '../stores/formStore'
import { useRouter } from 'vue-router'
import Drawer from 'primevue/drawer'

const router = useRouter()
const visible = ref(true)

const onDrawerClose = (value) => {
  if (!value) {
    visible.value = true // Ngăn không cho đóng
  }
}

const navigateTo = (route) => {
  router.push(route)
}
</script>

<template>
  <div class="z-[-100px]">
    <Drawer v-model:visible="visible" :modal="false" @update:visible="onDrawerClose">
      <template #container="{ closeCallback }">
        <div class="flex flex-col h-full bg-[#212134] text-white cursor-pointer">
          <div class="flex items-center justify-between px-6 pt-4 shrink-0" @click="navigateTo('/form-results')">
            <span class="inline-flex items-center gap-2">
              <i class="pi pi-home mr-2" style="font-size: 18px"></i>
              <span class="font-semibold text-lg text-primary">Dashboard</span>
            </span>
          </div>
          <div class="flex items-center justify-between px-6 pt-4 shrink-0" @click="navigateTo('/form')">
            <span class="inline-flex items-center gap-2">
              <i class="pi pi-slack mr-2" style="font-size: 18px"></i>
              <span class="font-semibold text-lg text-primary">Content Manager</span>
            </span>
          </div>
        </div>
      </template>
    </Drawer>
  </div>
</template>
