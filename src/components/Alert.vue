<script setup lang="ts">
const props = defineProps<{
  alert: {
    id: string
    message: string
    status?: string
  }
}>()
</script>

<template>
  <div class="alert-container" :class="{ critical: props.alert.status == 'critical' }">
    <span>{{ `${alert.id} - ${alert.message}` }}</span>
  </div>
</template>

<style lang="scss" scoped>
.alert-container {
  background-color: #ffeac9;
  padding: 8px;
  border: 1px solid #faa51c;
  border-radius: 5px;

  &.critical {
    background-color: #ffc4d0;
    border: 1px solid #ff4568;
  }
}
</style>
