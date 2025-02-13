<script setup>
import { ref, computed } from 'vue'
import { useFormStore } from '../stores/formStore'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const store = useFormStore()

const newWorkspace = ref('')
const showCreateDialog = ref(false)
const selectedField = ref(null)
const showFieldSelectionDialog = ref(false) // Dialog chọn field
const showFieldConfigDialog = ref(false)
const fieldName = ref('')
const workspaceFields = ref([])
const editingFieldIndex = ref(null)

const addWorkspace = () => {
  if (!newWorkspace.value.trim()) return

  store.createWorkspace(newWorkspace.value.trim())
  store.setWorkspace(newWorkspace.value.trim()) // Chọn workspace mới tạo làm workspace hiện tại

  newWorkspace.value = ''
  showCreateDialog.value = false
}

const fieldOptions = [
  {
    name: 'Text',
    description: 'Small or long text like title or description',
  },
  {
    name: 'Rich text (Blocks)',
    description: 'The new JSON-based rich text editor',
  },
  { name: 'JSON', description: 'Data in JSON format' },
  { name: 'Email', description: 'Email field with validation' },
  { name: 'Media', description: 'Files like images, videos, etc.' },
  {
    name: 'Rich text (Markdown)',
    description: 'The classic rich text editor',
  },
]

// const addField = () => {
//   if (!fieldLabel.value || !store.currentWorkspace) return

//   const newField = {
//     type: fieldType.value,
//     label: fieldLabel.value,
//     options:
//       fieldType.value === 'radio' || fieldType.value === 'select'
//         ? fieldOptions.value.split(',').map((opt) => opt.trim())
//         : [],
//   }

//   store.addField(newField)
//   fieldLabel.value = ''
//   fieldOptions.value = ''
//   showCreateField.value = false // Ẩn form sau khi thêm xong
// }

const addFieldToWorkspace = () => {
  if (selectedField.value) {
    const newField = {
      name: fieldName.value,
      type: selectedField.value.name,
    }

    if (editingFieldIndex.value !== null) {
      workspaceFields.value[editingFieldIndex.value] = newField
      editingFieldIndex.value = null
    } else {
      workspaceFields.value.push(newField)
    }
  }

  fieldName.value = ''
  selectedField.value = null
  showFieldConfigDialog.value = false
}

const openFieldSelection = () => {
  showFieldSelectionDialog.value = true
}

const selectField = (field) => {
  selectedField.value = field
  showFieldSelectionDialog.value = false
  showFieldConfigDialog.value = true
}

const editField = (index) => {
  const field = workspaceFields.value[index]

  fieldName.value = field.name
  selectedField.value = { name: field.type }
  editingFieldIndex.value = index

  showFieldConfigDialog.value = true
}

const currentFields = computed(() =>
  store.currentWorkspace ? store.workspaces[store.currentWorkspace] : []
)
</script>

<template>
  <div class="max-w-2xl mx-auto shadow-md rounded-lg h-screen p-6">
    <div class="text-white border-r w-fit absolute top-0 left-18 h-screen p-4">
      <h2 class="text-xl font-semibold">Content-Type Builder</h2>
      <hr class="my-4 border-gray-500" />
      <div class="pr-4 rounded-lg shadow-md">
        <h3 class="text-lg font-medium mb-2">Collection Types</h3>
        <ul class="text-blue-400">
          <li
            v-for="(fields, name) in store.workspaces"
            :key="name"
            class="hover:underline cursor-pointer"
            @click="store.setWorkspace(name)"
          >
            • {{ name }}
          </li>
          <li
            class="text-gray-400 hover:underline cursor-pointer text-xs mt-2"
            @click="showCreateDialog = true"
          >
            + Create new collection type
          </li>
        </ul>
      </div>
    </div>

    <Dialog
      v-model:visible="showCreateDialog"
      header="Create a collection type"
      modal
      class="w-1/3"
      dismissableMask="false"
    >
      <div class="mb-4">
        <label class="block text-sm mb-1">Display name</label>
        <InputText v-model="newWorkspace" class="w-full" />
      </div>
      <template #footer>
        <Button label="Cancel" severity="secondary" @click="showCreateDialog = false" />
        <Button label="Continue" severity="primary" @click="addWorkspace" />
      </template>
    </Dialog>

    <h2 class="text-2xl font-bold mb-4 pt-4">Quản lý Workspaces</h2>

    <!-- <div v-if="showCreateWorkspace" class="mb-4 flex gap-2">
      <input v-model="newWorkspace" placeholder="Nhập tên Workspace" class="border p-2 flex-grow rounded-lg" />
      <button @click="addWorkspace" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Tạo
      </button>
    </div> -->

    <Dialog
      v-model:visible="showFieldSelectionDialog"
      modal
      header="Select a field for your collection type"
      class="w-[1000px] bg-[#212134] rounded-lg"
      dismissableMask="false"
    >
      <div class="grid grid-cols-2 gap-4 p-4">
        <button
          v-for="field in fieldOptions"
          :key="field.name"
          @click="selectField(field)"
          class="p-4 bg-[#212134] text-white rounded-lg hover:bg-[#2e2e4b] flex justify-items-start gap-2"
        >
          <span>{{ field.icon }}</span>
          <div>
            <strong>{{ field.name }}</strong>
            <p class="text-sm text-gray-400">{{ field.description }}</p>
          </div>
        </button>
      </div>
    </Dialog>

    <Dialog
      v-model:visible="showFieldConfigDialog"
      modal
      :header="`Add new ${selectedField?.name || ''} field`"
      class="w-[600px] bg-[#181826] rounded-lg"
      dismissableMask="false"
    >
      <div class="p-4">
        <p class="text-gray-400">{{ selectedField?.description }}</p>

        <div class="mt-4">
          <label class="text-white">Name</label>
          <input
            v-model="fieldName"
            type="text"
            class="w-full p-2 bg-gray-800 rounded text-white"
          />
        </div>
      </div>

      <template #footer>
        <button
          @click="showFieldConfigDialog = false"
          class="px-4 py-2 bg-gray-600 text-white rounded-lg"
        >
          Cancel
        </button>
        <button
          @click="addFieldToWorkspace"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Finish
        </button>
      </template>
    </Dialog>

    <div class="p-4 bg-[#181826] text-white rounded-lg">
      <h2 class="text-lg font-bold mb-4">Workspace Fields</h2>

      <table class="w-full bg-gray-900 text-white rounded-lg mt-4">
        <thead>
          <tr class="border-b border-gray-700">
            <th class="p-3 text-left">NAME</th>
            <th class="p-3 text-left">TYPE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="workspaceFields.length === 0">
            <td colspan="3" class="p-3 text-center text-gray-400">Chưa có field nào</td>
          </tr>
          <tr
            v-for="(field, index) in workspaceFields"
            :key="index"
            class="border-b border-gray-800"
          >
            <td class="p-3">{{ field.name }}</td>
            <td class="p-3">{{ field.type }}</td>
            <td class="p-3 text-center">
              <button
                @click="editField(index)"
                class="mr-2 text-yellow-400 cursor-pointer"
              >
                ✏️
              </button>
              <button @click="deleteField(index)" class="text-red-400 cursor-pointer">
                🗑
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        v-if="currentFields.length === 0"
        class="text-center p-6 bg-[#181826] rounded-lg"
      >
        <button
          @click="openFieldSelection"
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          + Add new field
        </button>
      </div>
    </div>
  </div>
</template>
