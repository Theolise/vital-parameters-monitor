<script setup lang="ts">
import Status from '@/components/Status.vue'

defineProps<{
  status: string
  medicalRecordNumber: string
}>()
</script>

<template>
  <div class="status">
    <Status :status="status" />
    <span class="label">{{ medicalRecordNumber }}</span>
  </div>
</template>

<style lang="scss" scoped>
.status {
  display: flex;
  align-items: center;
  gap: 4px;

  .label {
    font-size: 20px;
    font-weight: 500;
  }
}
</style>
