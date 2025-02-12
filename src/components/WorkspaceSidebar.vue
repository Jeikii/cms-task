<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (route) => {
  router.push(route)
}
</script>

<template>
  <div class="flex bg-[#212134] h-full fixed top-0 left-0 pt-6 w-[50px] justify-center">
    <!-- Sidebar -->
    <div class="flex flex-col space-y-6">
      <div class="p-3 rounded hover:bg-[#181826] cursor-pointer" @click="navigateTo('/form-results')">
        <i class="pi pi-home" style="font-size: 1.2rem"></i>
      </div>
      <div class="p-3 rounded hover:bg-[#181826] cursor-pointer" @click="navigateTo('/form')">
        <i class="pi pi-slack" style="font-size: 1.2rem"></i>
      </div>
      <div class="p-3 rounded hover:bg-[#181826] cursor-pointer" @click="navigateTo('/')">
        <i class="pi pi-objects-column" style="font-size: 1.2rem"></i>
      </div>
    </div>

    <!-- Main Content -->
  </div>
  
</template>
