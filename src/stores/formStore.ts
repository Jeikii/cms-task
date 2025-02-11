import { defineStore } from 'pinia';
import { ref } from 'vue';

interface FormField {
  id: number;
  type: string;
  label: string;
  options?: string[];
  value: any;
}

interface FormResult {
  id: number;
  workspace: string;
  data: Record<string, any>;
}

export const useFormStore = defineStore('formStore', () => {
  const workspaces = ref<Record<string, FormField[]>>({}); // Lưu danh sách workspace và các field
  const currentWorkspace = ref<string | null>(null);
  const formResults = ref<FormResult[]>([]); // Lưu kết quả nhập form
  const editingForm = ref<FormResult | null>(null); // Lưu form đang chỉnh sửa

  // Tạo workspace mới
  const createWorkspace = (name: string) => {
    if (!workspaces.value[name]) {
      workspaces.value[name] = [];
    }
    currentWorkspace.value = name;
  };

  // Thêm field vào workspace hiện tại
  const addField = (field: Omit<FormField, 'id' | 'value'>) => {
    if (!currentWorkspace.value) return;
    workspaces.value[currentWorkspace.value].push({
      id: Date.now(),
      type: field.type,
      label: field.label,
      options: field.options || [],
      value: field.type === 'checkbox' ? false : ''
    });
  };

  // Xóa field khỏi workspace
  const removeField = (index: number) => {
    if (!currentWorkspace.value) return;
    workspaces.value[currentWorkspace.value].splice(index, 1);
  };

  // Chuyển workspace
  const setWorkspace = (name: string) => {
    if (workspaces.value[name]) {
      currentWorkspace.value = name;
    }
  };

  // Lưu dữ liệu form vào workspace hiện tại
  const saveFormData = (data: Record<string, any>) => {
    if (editingForm.value) {
      // Cập nhật dữ liệu nếu đang chỉnh sửa
      const index = formResults.value.findIndex(f => f.id === editingForm.value?.id);
      if (index !== -1) {
        formResults.value[index].data = { ...data };
      }
      editingForm.value = null; // Reset trạng thái chỉnh sửa
    } else {
      // Lưu mới nếu không phải đang chỉnh sửa
      formResults.value.push({
        id: Date.now(),
        workspace: currentWorkspace.value || '',
        data: { ...data }
      });
    }
  };

  // Đặt form để chỉnh sửa
  const setEditingForm = (form: FormResult) => {
    editingForm.value = form;
  };

  return {
    workspaces,
    currentWorkspace,
    formResults,
    editingForm,
    createWorkspace,
    addField,
    removeField,
    setWorkspace,
    saveFormData,
    setEditingForm
  };
});
