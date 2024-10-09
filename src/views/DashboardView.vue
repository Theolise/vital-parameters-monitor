<script setup lang="ts">
import { ref, onUnmounted, computed } from 'vue'

import { getPatients } from '@/services/patient'

import AlertList from '@/components/AlertList.vue'
import VitalOverview from '@/components/VitalOverview.vue'

const patients = getPatients()

const countVitals = ref(0)
const countVitalsBloodPressure = ref(0)
const search = ref('')

const updateCountVitals = () => {
  if (countVitals.value < 4) {
    countVitals.value++
  } else {
    countVitals.value = 0
  }
}

const updateCountVitalsBloddPressure = () => {
  if (countVitalsBloodPressure.value < 2) {
    countVitalsBloodPressure.value++
  } else {
    countVitalsBloodPressure.value = 0
  }
}

const countVitalsInterval = setInterval(updateCountVitals, 60000)
const countVitalsBloodPressureInterval = setInterval(updateCountVitalsBloddPressure, 60000)

const patientsData = computed(() => {
  if (search.value == '') {
    return patients
  }

  const lowerCaseSearch = search.value.toLowerCase()
  return patients.filter(
    (patient) =>
      patient.lastName.toLowerCase().includes(lowerCaseSearch) ||
      patient.medicalRecordNumber.toLowerCase().includes(lowerCaseSearch)
  )
})

onUnmounted(() => {
  clearInterval(countVitalsInterval)
  clearInterval(countVitalsBloodPressureInterval)
})
</script>

<template>
  <div class="dashboard-container">
    <div class="search">
      <input v-model="search" placeholder="Search a patient" />
    </div>

    <div class="content">
      <AlertList
        :patients="patients"
        :incrementVitals="countVitals"
        :incrementVitalsBloodPressure="countVitalsBloodPressure"
      />
      <div class="patient-vitals">
        <VitalOverview
          v-for="patient in patientsData"
          :key="patient.id"
          :medicalRecordNumber="patient.medicalRecordNumber"
          :patient="patient"
          :incrementVitals="countVitals"
          :incrementVitalsBloodPressure="countVitalsBloodPressure"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .search {
    width: 100%;
    border-bottom: 1px solid #a8b0fc;

    > input {
      font-size: 14px;
      width: 100%;
      max-width: 100%;
      line-height: 36px;
      border: none;
      background-color: #f1f4fb;
    }

    > input:focus {
      outline: none;
    }
  }

  .content {
    display: flex;
    gap: 24px;

    .patient-vitals {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
    }
  }
}
</style>
