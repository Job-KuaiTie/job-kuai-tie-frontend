<script setup lang="ts">
// import { ref, watch } from 'vue'
const value = defineModel<number>('value', {
  required: true,
})
const props = defineProps({
  label: { type: String, required: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
  min: { type: Number },
  max: { type: Number },
  prefix: { type: String },
  suffix: { type: String },
  mode: {
    type: String as () => 'currency' | 'decimal',
    default: 'decimal', // Explicit type
  },
  currency: { type: String },
  locale: { type: String },
  disabled: { type: Boolean, default: false },
  fluid: { type: Boolean, defualt: true },
})
</script>

<template>
  <FloatLabel variant="on">
    <InputNumber
      v-if="props.type == 'integer'"
      v-model="value"
      :inputId="props.name"
      :min="props.min"
      :max="props.max"
      :prefix="props.prefix"
      :suffix="props.suffix"
      :mode="props.mode"
      :currency="props.currency"
      :maxFractionDigits="0"
      :locale="props.locale"
      :disabled="props.disabled"
      :fluid="props.fluid"
    />
    <InputNumber
      v-else-if="props.type == 'float'"
      v-model="value"
      :inputId="props.name"
      :min="props.min"
      :max="props.max"
      :prefix="props.prefix"
      :suffix="props.suffix"
      :mode="props.mode"
      :currency="props.currency"
      :locale="props.locale"
      :minFractionDigits="2"
      :maxFractionDigits="2"
      :disabled="props.disabled"
      :fluid="props.fluid"
    />
    <label :for="props.name">{{ props.label }}</label>
  </FloatLabel>
</template>

<style scoped></style>
