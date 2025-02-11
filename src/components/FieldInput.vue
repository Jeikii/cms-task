<script setup>
defineProps(['field', 'modelValue']);
defineEmits(['update:modelValue']);
</script>

<template>
  <div>
    <label>{{ field.label }}</label>
    <input 
      v-if="field.type === 'text' || field.type === 'number'"
      :type="field.type" 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <input 
      v-if="field.type === 'checkbox'" 
      type="checkbox" 
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
  </div>
</template>
