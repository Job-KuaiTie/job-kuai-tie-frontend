<script setup lang="ts">
const value = defineModel<string>({
  required: true,
});

defineEmits(['blur']);

const props = defineProps({
  label: { type: String, required: true },
  name: { type: String, required: true },
  size: { type: String },
  disabled: { type: Boolean, default: false },
  invalid: { type: Boolean, default: false },
  error: { type: String },
  fluid: { type: Boolean, defualt: true },
})
</script>

<template>
  <div>
    <FloatLabel variant="on" :class="{ 'focus-within:text-primary-600': props.invalid }">
      <InputText v-model="value" :name="props.name" :disabled="props.disabled" :invalid="props.invalid"
        :fluid="props.fluid" @blur="$emit('blur')" class="peer" />
      <label :for="props.name"
        :class="{ 'text-red-600': props.invalid, 'peer-hover:text-primary-600': props.invalid, 'peer-focus:text-primary-600': props.invalid }">{{
          props.label
        }}</label>
    </FloatLabel>
    <small v-if="props.error" class="text-red-600">
      {{ props.error }}
    </small>
  </div>
</template>

<style scoped></style>
