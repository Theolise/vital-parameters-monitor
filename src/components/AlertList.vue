<script setup lang="ts">
import { computed } from 'vue'

import { checkVitals } from '@/utils/alert'

import Alert from '@/components/Alert.vue'

const props = defineProps<{
  patients: any[]
  incrementVitals: number
  incrementVitalsBloodPressure: number
}>()

const alerts = computed(() => {
  return checkVitals(props.patients, props.incrementVitals, props.incrementVitalsBloodPressure)
})
</script>

<template>
  <div class="alert-list-container">
    <span class="title">Alerts</span>
    <Alert
      v-for="(criticalAlert, index) in alerts.criticalAlerts"
      :key="index"
      :alert="{ ...criticalAlert, status: 'critical' }"
    />
    <Alert v-for="(alert, index) in alerts.alerts" :key="index" :alert="alert" />
  </div>
</template>

<style lang="scss" scoped>
.alert-list-container {
  min-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-right: 8px;
  border-right: 1px solid #a8b0fc;

  .title {
    font-size: 20px;
    font-weight: 500;
  }
}
</style>
