<script setup>
import { useFormStore } from '../stores/formStore';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import DataTable  from 'primevue/datatable';
import Column  from 'primevue/column';
import Button from 'primevue/button';

const store = useFormStore();
const router = useRouter();

// Khi bấm vào một dòng, load dữ liệu để chỉnh sửa
const editForm = (form) => {
  store.setEditingForm(form);
  router.push('/form');
};

// Gom nhóm dữ liệu theo workspace
const groupedResults = computed(() => {
  return store.formResults.reduce((acc, form) => {
    acc[form.workspace] = acc[form.workspace] || [];
    acc[form.workspace].push(form);
    return acc;
  }, {});
});
</script>
<template>
  <div class="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
    <div v-for="(group, workspace) in groupedResults" :key="workspace" class="mb-6 p-4 border rounded-lg bg-gray-50 shadow">
      <h3 class="text-lg font-semibold mb-2 text-gray-700">{{ workspace }}</h3>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse border border-gray-300 rounded-lg shadow-sm">
          <thead>
            <tr class="bg-blue-500 text-white">
              <th class="p-3 border border-gray-300">Id</th>
              <th v-for="field in store.workspaces[workspace]" :key="field.id" class="p-3 border border-gray-300">
                {{ field.label }}
              </th>
              <th class="p-3 border border-gray-300">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in group" :key="index" class="bg-white hover:bg-gray-100 border-t border-gray-300 text-center">
              <td class="p-3 border border-gray-300">{{ index + 1 }}</td>
              <td v-for="field in store.workspaces[workspace]" :key="field.id" class="p-3 border border-gray-300">
                {{ row.data[field.id] || '—' }}
              </td>
              <td class="p-3 border border-gray-300">
                <button @click="editForm(row)" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2">
                  <i class="pi pi-pencil"></i>
                  Sửa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

