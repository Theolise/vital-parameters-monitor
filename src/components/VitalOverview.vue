<script setup lang="ts">
import { computed } from 'vue'

import type { Patient } from '@/types/patient'
import { getAlerts } from '@/utils/alert'

import PatientStatus from '@/components/PatientStatus.vue'

const props = defineProps<{
  medicalRecordNumber?: string
  patient: Patient
  incrementVitals: number
  incrementVitalsBloodPressure: number
}>()

const status = computed(() => {
  let patientStatus = {} as any
  patientStatus[props.patient.medicalRecordNumber] = 'stable'
  return getAlerts(
    props.patient,
    props.incrementVitals,
    props.incrementVitalsBloodPressure,
    patientStatus
  ).patientStatus[props.patient.medicalRecordNumber]
})
</script>

<template>
  <RouterLink :to="{ name: 'patientDetails', params: { id: patient.id } }">
    <div class="overview-container" :class="{ critical: status == 'critical' }">
      <div class="detail">
        <PatientStatus :status="status" :medical-record-number="patient.medicalRecordNumber" />
        <span>{{ `${patient.firstName} ${patient.lastName}` }}</span>
      </div>
      <div class="detail">
        <img alt="Heart rate logo" src="../../public/heart-rate.svg" width="24" height="24" />
        <span>{{ `${patient.vitals.heartRate[incrementVitals]} bpm` }}</span>
      </div>
      <div class="detail">
        <img
          alt="Blood pressure logo"
          src="../../public/blood-pressure.svg"
          width="24"
          height="24"
        />
        <span>{{
          `${patient.vitals.bloodPressure[incrementVitalsBloodPressure].systolic} / ${patient.vitals.bloodPressure[incrementVitalsBloodPressure].diastolic} mm Hg`
        }}</span>
      </div>
      <div class="detail">
        <img alt="Temperature logo" src="../../public/temperature.svg" width="24" height="24" />
        <span>{{ `${patient.vitals.temperature[incrementVitals]} °C` }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
.overview-container {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  background-color: white;
  border-radius: 5px;
  padding: 16px;

  &.critical {
    background-color: #ffc4d0;
    border: 1px solid #ff4568;
  }

  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;

    .status {
      display: flex;
      gap: 4px;
    }
  }
}
</style>
