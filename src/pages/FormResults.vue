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
  <div class="p-6 max-w-4xl mx-auto text-white rounded-lg">
    <div v-for="(group, workspace) in groupedResults" :key="workspace" class="mb-6 p-4  rounded-lg ">
      <h3 class="text-lg font-semibold mb-2 ">{{ workspace }}</h3>
      <div class="overflow-x-auto">
        <table class="w-full bg-[#212134] rounded-lg">
          <thead>
            <tr class=" text-white">
              <th class="p-3 border border-gray-700">Id</th>
              <th v-for="field in store.workspaces[workspace]" :key="field.id" class="p-3 border border-gray-700">
                {{ field.label }}
              </th>
              <th class="p-3 border border-gray-700">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in group" :key="index" class=" border-t border-gray-700 text-center">
              <td class="p-3 border border-gray-700">{{ index + 1 }}</td>
              <td v-for="field in store.workspaces[workspace]" :key="field.id" class="p-3 border border-gray-700">
                {{ row.data[field.id] || '—' }}
              </td>
              <td class="p-3 border border-gray-700">
                <button @click="editForm(row)" class=" text-white px-4 py-2 rounded-lg  flex items-center gap-2">
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

