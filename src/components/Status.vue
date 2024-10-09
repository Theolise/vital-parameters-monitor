<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  status: string
  withLabel?: boolean
}>()

const getLabel = computed(() => {
  switch (props.status) {
    case 'watch':
      return 'To watch'
    case 'critical':
      return 'Critical'
    default:
      return 'Stable'
  }
})
</script>

<template>
  <div class="status-container">
    <div class="dot" :class="status"></div>
    <span v-if="withLabel">{{ getLabel }}</span>
  </div>
</template>

<style lang="scss" scoped>
.status-container {
  display: flex;
  gap: 4px;

  .dot {
    width: 18px;
    height: 18px;
    border-radius: 50%;

    &.stable {
      background-color: #2f9e2c;
    }

    &.watch {
      background-color: #faa51c;
    }

    &.critical {
      background-color: #ff4568;
    }
  }
}
</style>
