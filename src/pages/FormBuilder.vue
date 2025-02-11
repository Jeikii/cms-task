<script setup>
import { ref, computed } from 'vue'
import { useFormStore } from '../stores/formStore'

const store = useFormStore()

const newWorkspace = ref('')
const fieldType = ref('text')
const fieldLabel = ref('')
const fieldOptions = ref('')

const addWorkspace = () => {
  if (!newWorkspace.value) return
  store.createWorkspace(newWorkspace.value)
  newWorkspace.value = ''
}

const addField = () => {
  if (!fieldLabel.value || !store.currentWorkspace) return

  const newField = {
    type: fieldType.value,
    label: fieldLabel.value,
    options:
      fieldType.value === 'radio' || fieldType.value === 'select'
        ? fieldOptions.value.split(',').map((opt) => opt.trim())
        : [],
  }

  store.addField(newField)
  fieldLabel.value = ''
  fieldOptions.value = ''
}

const currentFields = computed(() =>
  store.currentWorkspace ? store.workspaces[store.currentWorkspace] : []
)
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 shadow-md rounded-lg">
    <h2 class="text-2xl font-bold mb-4">Quản lý Workspaces</h2>
    
    <div class="mb-4 flex gap-2">
      <input v-model="newWorkspace" placeholder="Nhập tên Workspace" class="border p-2 flex-grow rounded-lg" />
      <button @click="addWorkspace" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Tạo</button>
    </div>
    
    <div class="mb-4">
      <h3 class="text-lg font-semibold">Chọn Workspace</h3>
      <select v-model="store.currentWorkspace" class="border p-2 w-full rounded-lg">
        <option v-for="(fields, name) in store.workspaces" :key="name" :value="name">
          {{ name }}
        </option>
      </select>
    </div>
    
    <div v-if="store.currentWorkspace" class="mb-4 p-4 border rounded-lg">
      <h3 class="text-lg font-semibold mb-2">Thêm Trường vào {{ store.currentWorkspace }}</h3>
      <div class="flex gap-2 mb-2">
        <input v-model="fieldLabel" placeholder="Nhập tên trường" class="border p-2 flex-grow rounded-lg" />
        <select v-model="fieldType" class="border p-2 rounded-lg bg-[#181826]">
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="checkbox">Checkbox</option>
          <option value="textarea">Textarea</option>
          <option value="radio">Radio Button</option>
          <option value="select">Dropdown (Select)</option>
          <option value="date">Date Picker</option>
          <option value="file">File Upload</option>
        </select>
      </div>
      <input
        v-if="fieldType === 'radio' || fieldType === 'select'"
        v-model="fieldOptions"
        placeholder="Nhập options, cách nhau bởi dấu phẩy"
        class="border p-2 w-full rounded-lg mb-2"
      />
      <button @click="addField" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Thêm</button>
    </div>
    
    <div v-if="store.currentWorkspace" class="p-4 border rounded-lg">
      <h3 class="text-lg font-semibold mb-2">Danh sách trường trong {{ store.currentWorkspace }}</h3>
      <div v-for="(field, index) in currentFields" :key="field.id" class="flex justify-between items-center border-b py-2">
        <label class="font-medium">{{ field.label }}</label>
        <button @click="store.removeField(index)" class="text-red-500 hover:text-red-700">Xóa</button>
      </div>
    </div>
  </div>
</template>

