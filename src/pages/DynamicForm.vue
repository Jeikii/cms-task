<script setup>
import { useFormStore } from '../stores/formStore';
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const store = useFormStore();
const router = useRouter();
const formData = ref({});

// Khi workspace thay đổi, reset dữ liệu
watch(() => store.currentWorkspace, (newWorkspace) => {
  if (newWorkspace) {
    resetForm();
  }
});

// Hàm reset form (chạy khi tạo mới)
const resetForm = () => {
  formData.value = {};
  store.workspaces[store.currentWorkspace]?.forEach(field => {
    formData.value[field.id] = field.type === 'checkbox' ? false : '';
  });
};

// Nếu có dữ liệu chỉnh sửa, load vào form
onMounted(() => {
  if (store.editingForm) {
    formData.value = { ...store.editingForm.data };
  }
});

// Xử lý lưu form
const submitForm = () => {
  store.saveFormData(formData.value);
  router.push('/form-results');
};

const currentFields = computed(() => store.currentWorkspace ? store.workspaces[store.currentWorkspace] : []);
</script>

<template>
  <div class="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">
      {{ store.currentWorkspace }}
    </h2>

    <form v-if="store.currentWorkspace" @submit.prevent="submitForm" class="space-y-4">
      <div v-for="field in currentFields" :key="field.id" class="space-y-2">
        <label class="block text-gray-700 font-medium">{{ field.label }}</label>
        
        <input v-if="['text', 'number'].includes(field.type)" v-model="formData[field.id]" :type="field.type"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        
        <textarea v-if="field.type === 'textarea'" v-model="formData[field.id]"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        
        <div v-if="field.type === 'checkbox'" class="flex items-center space-x-2">
          <input type="checkbox" v-model="formData[field.id]" class="w-5 h-5 text-blue-500" />
          <span class="text-gray-700">{{ field.label }}</span>
        </div>
        
        <div v-if="field.type === 'radio'" class="flex flex-wrap gap-4">
          <label v-for="option in field.options" :key="option" class="flex items-center space-x-2">
            <input type="radio" :name="field.id" :value="option" v-model="formData[field.id]"
              class="w-5 h-5 text-blue-500" />
            <span class="text-gray-700">{{ option }}</span>
          </label>
        </div>
        
        <select v-if="field.type === 'select'" v-model="formData[field.id]"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option v-for="option in field.options" :key="option">{{ option }}</option>
        </select>
        
        <input v-if="field.type === 'date'" type="date" v-model="formData[field.id]"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      
      <button type="submit"
        class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition">
        {{ store.editingForm ? 'Cập Nhật' : 'Gửi Dữ Liệu' }}
      </button>
    </form>

    <p v-else class="text-gray-500 text-center mt-4">Vui lòng chọn Workspace để nhập dữ liệu.</p>
  </div>
</template>
