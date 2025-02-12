<script setup>
import WorkspaceSidebar from './components/WorkspaceSidebar.vue'
import 'primeicons/primeicons.css'
</script>

<template>
  <div id="app" class="bg-[#181826] min-h-screen text-white">
    <WorkspaceSidebar />
    <!-- <nav class="p-4 flex justify-center gap-4 ">
      <router-link to="/" class="text-blue-400 hover:text-blue-300">🔧 Form Builder</router-link>
      <span class="text-gray-400">|</span>
      <router-link to="/form" class="text-blue-400 hover:text-blue-300">📝 Nhập Dữ Liệu</router-link>
      <span class="text-gray-400">|</span>
      <router-link to="/form-results" class="text-blue-400 hover:text-blue-300">📈 Quản lý Content</router-link>
    </nav> -->

    <main class="flex">
      <div class="flex-grow">
        <router-view />
      </div>
    </main>
  </div>
</template>
